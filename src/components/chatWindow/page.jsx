// src/components/ChatWindow.js
"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const ChatWindow = ({ selectedUser }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser && currentUser) {
      const messagesRef = collection(
        db,
        "conversations",
        `${currentUser.uid}_${selectedUser}`,
        "messages"
      );
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesList = querySnapshot.docs.map((doc) => doc.data());
        setMessages(messagesList);
      });

      return () => unsubscribe();
    }
  }, [selectedUser, currentUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "" && currentUser && selectedUser) {
      try {
        await addDoc(
          collection(
            db,
            "conversations",
            `${currentUser.uid}_${selectedUser}`,
            "messages"
          ),
          {
            text: newMessage,
            sender: currentUser.uid,
            participants: [currentUser.uid, selectedUser],
            createdAt: new Date(),
          }
        );
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

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
