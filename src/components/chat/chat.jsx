"use client";
// components/Chat.js
import React, { useEffect, useState } from "react";
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

const Chat = ({ selectedUser }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (currentUser && selectedUser) {
      const q = query(
        collection(db, "chats"),
        where("senderId", "in", [currentUser.uid, selectedUser]),
        where("receiverId", "in", [currentUser.uid, selectedUser]),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let messagesArray = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push({ id: doc.id, ...doc.data() });
        });
        setMessages(messagesArray);
      });

      return () => unsubscribe();
    }
  }, [currentUser, selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "chats"), {
        senderId: currentUser.uid,
        receiverId: selectedUser,
        message: newMessage,
        timestamp: new Date(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>
              {msg.senderId === currentUser.uid ? "You" : "Other"}:
            </strong>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
