"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineChat } from "react-icons/md";

const fetchUnreadMessagesCount = async (currentUser) => {
  const conversationsRef = collection(db, "conversations");
  const conversationsQuery = query(
    conversationsRef,
    where("participants", "array-contains", currentUser.uid)
  );

  const querySnapshot = await getDocs(conversationsQuery);
  const unreadMessagesCount = {};

  for (const doc of querySnapshot.docs) {
    const conversationId = doc.id;
    const messagesRef = collection(
      db,
      `conversations/${conversationId}/messages`
    );
    const messagesQuery = query(
      messagesRef,
      where("read", "==", false),
      orderBy("createdAt", "asc")
    );
    const messagesSnapshot = await getDocs(messagesQuery);

    const unreadCount = messagesSnapshot.docs.filter(
      (msg) => msg.data().sender !== currentUser.uid
    ).length;

    const lastMessageSender =
      messagesSnapshot.docs.length > 0
        ? messagesSnapshot.docs[messagesSnapshot.docs.length - 1].data().sender
        : null;

    unreadMessagesCount[conversationId] = {
      count: unreadCount.length,
      lastMessageSender,
    };
  }

  return unreadMessagesCount;
};

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        // Sort users to place the current user at the top
        const sortedUsers = usersList.sort((a, b) => {
          if (a.uid === currentUser.uid) return -1;
          if (b.uid === currentUser.uid) return 1;
          return 0;
        });

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    const fetchUnreadMessages = async () => {
      const unreadCounts = await fetchUnreadMessagesCount(currentUser);
      setUnreadMessages(unreadCounts);
    };

    if (currentUser) {
      fetchUsers();
      fetchUnreadMessages();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>; // Or any loading state/UI
  }

  return (
    <div className="mx-10">
      <ul className="">
        {users.map((user) => (
          <div
            onClick={() => onSelectUser(user.uid)}
            key={user.uid}
            className="cursor-pointer flex items-center justify-between max-w-80 sm:border-b-4 hover:bg-slate-300 sm:rounded-2xl py-1 px-2"
          >
            <li className="my-2">
              <span>
                {user.inputValue || user.uid}{" "}
                {user.uid === currentUser.uid && "(Me)"}
              </span>
              <div className="flex items-center space-x-2">
                {unreadMessages[user.uid] &&
                  unreadMessages[user.uid].count > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      {unreadMessages[user.uid].count} new
                    </span>
                  )}
                {unreadMessages[user.uid] &&
                  unreadMessages[user.uid].lastMessageSender && (
                    <span className="text-gray-500 text-xs">
                      Last message from:{" "}
                      {unreadMessages[user.uid].lastMessageSender}
                    </span>
                  )}
              </div>
            </li>
            <MdOutlineChat />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
