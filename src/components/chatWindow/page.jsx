"use client";

import React, { useState, useEffect, useRef } from "react";
import { db } from "@/app/firebase/config";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

import { useAuth } from "@/context/AuthContext";

const ChatWindow = ({ selectedUser }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      const conversationRef = query(
        collection(db, "conversations"),
        where("participants", "array-contains", currentUser.uid)
      );

      const unsubscribe = onSnapshot(conversationRef, (querySnapshot) => {
        let conversationId;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.participants.includes(currentUser.uid) &&
            data.participants.includes(selectedUser)
          ) {
            conversationId = doc.id;
          }
        });

        if (conversationId) {
          const messagesRef = collection(
            db,
            `conversations/${conversationId}/messages`
          );
          const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

          const unsubscribeMessages = onSnapshot(
            messagesQuery,
            (messagesSnapshot) => {
              const messagesList = messagesSnapshot.docs.map((doc) =>
                doc.data()
              );
              setMessages(messagesList.reverse());
            }
          );

          return () => unsubscribeMessages();
        }
      });

      return () => unsubscribe();
    }
  }, [selectedUser, currentUser.uid]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      try {
        let conversationId;

        // Check if conversation already exists
        const conversationRef = query(
          collection(db, "conversations"),
          where("participants", "array-contains", currentUser.uid)
        );

        const querySnapshot = await getDocs(conversationRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.participants.includes(currentUser.uid) &&
            data.participants.includes(selectedUser)
          ) {
            conversationId = doc.id;
          }
        });

        // If conversation doesn't exist, create it
        if (!conversationId) {
          const newConversationRef = await addDoc(
            collection(db, "conversations"),
            {
              participants: [currentUser.uid, selectedUser],
            }
          );
          conversationId = newConversationRef.id;
        }

        // Add message to the conversation
        await addDoc(
          collection(db, `conversations/${conversationId}/messages`),
          {
            text: newMessage,
            sender: currentUser.uid,
            createdAt: Timestamp.now(),
          }
        );

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <h2>Chat with {selectedUser}</h2>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === currentUser.uid ? "sent" : "received"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
