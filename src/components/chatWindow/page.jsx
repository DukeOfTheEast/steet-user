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
import Default from "@/images/default-image.png";
import { VscSend } from "react-icons/vsc";
import Image from "next/image";

const ChatWindow = ({ selectedUser, closeChat }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  // console.log(users);
  // console.log(selectedUser);

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
  }, [selectedUser, currentUser]);

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
            read: false,
          }
        );

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const formatUserId = (userId) => {
    if (userId.length <= 11) return userId; // Return as is if it's already short
    return `${userId.slice(0, 5)}...${userId.slice(-5)}`;
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
        <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-md max-w-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <div>
              {users.map(
                (user) =>
                  user.uid === selectedUser && (
                    <div key={user.uid} className="flex gap-2">
                      <Image
                        src={user.photoURL || Default.src}
                        alt="profile"
                        width={30}
                        height={30}
                        className="max-w-8 max-h-8 rounded-full"
                      />
                      <h2 key={user.uid} className="text-lg font-semibold">
                        {user.inputValue || formatUserId(user.uid)}
                      </h2>
                    </div>
                  )
              )}
            </div>
            <AiOutlineClose
              size={24}
              onClick={closeChat}
              className="cursor-pointer"
            />
          </div>

          <div className="p-4 h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="flex">
                <p
                  className={`text-white p-1 rounded-xl min-w-10 max-w-48 text-center ${
                    message.sender === currentUser.uid
                      ? "bg-[#FF5C00] ml-auto my-0.5 px-2"
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
              className="flex-grow border rounded p-2 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#FF5C00] hover:bg-[#f7b38d] text-white rounded p-2"
            >
              <VscSend size={25} className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
