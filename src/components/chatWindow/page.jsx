"use client";

import React, { useState, useEffect, useRef } from "react";
import { db } from "@/app/firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { AiOutlineClose } from "react-icons/ai";

const ChatWindow = ({ selectedUser, closeChat }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  // const [closeModal, setCloseModal] = useState(false);

  // const exitChat = () => {
  //   setCloseModal(!closeModal);
  // };

  useEffect(() => {
    let unsubscribeMessages;

    const fetchMessages = async (conversationId) => {
      const messagesRef = collection(
        db,
        `conversations/${conversationId}/messages`
      );
      const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

      unsubscribeMessages = onSnapshot(messagesQuery, (messagesSnapshot) => {
        const messagesList = messagesSnapshot.docs.map((doc) => doc.data());
        setMessages(messagesList);
      });
    };

    const fetchConversationId = async () => {
      const conversationRef = query(
        collection(db, "conversations"),
        where("participants", "array-contains", currentUser.uid)
      );

      const querySnapshot = await getDocs(conversationRef);
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
        fetchMessages(conversationId);
      } else {
        // If conversation doesn't exist, create it
        try {
          const newConversationRef = await addDoc(
            collection(db, "conversations"),
            {
              participants: [currentUser.uid, selectedUser],
            }
          );
          fetchMessages(newConversationRef.id);
        } catch (error) {
          console.error("Error creating conversation: ", error);
        }
      }
    };

    fetchConversationId();

    return () => {
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
    };
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Chat with {selectedUser}</h2>
            <AiOutlineClose size={24} onClick={closeChat} />
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="flex">
                <p
                  className={`text-white p-1 rounded-lg min-w-10 text-center ${
                    message.sender === currentUser.uid
                      ? "bg-blue-500 ml-auto my-0.5"
                      : "bg-gray-500 my-0.5"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border rounded p-2 mr-2"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white rounded p-2"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
