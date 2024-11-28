"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { markMessagesAsRead } from "@/utils/messageUtils";
import Default from "@/images/default-image.png";
import SpinnerLarge from "../spinnerLarge/page";
import Image from "next/image";

const fetchUnreadMessagesCount = async (currentUser) => {
  const conversationsRef = collection(db, "conversations");
  const conversationsQuery = query(
    conversationsRef,
    where("participants", "array-contains", currentUser.uid)
  );

  const querySnapshot = await getDocs(conversationsQuery);
  // const unreadMessagesCount = {};
  // unreadMessagesCount[otherUserId] = {
  //   count: messagesSnapshot.size,
  //   hasUnread: messagesSnapshot.size > 0,
  // };

  const unreadMessagesCount = {};

  for (const doc of querySnapshot.docs) {
    const conversationId = doc.id;
    const participants = doc.data().participants;
    const otherUserId = participants.find((id) => id !== currentUser.uid);

    if (!otherUserId) continue;
    const messagesRef = collection(
      db,
      `conversations/${conversationId}/messages`
    );
    const messagesQuery = query(
      messagesRef,
      where("read", "==", false),
      where("sender", "==", otherUserId),
      orderBy("createdAt", "desc")
    );
    const messagesSnapshot = await getDocs(messagesQuery);

    // const unreadMessagesCount = {};
    unreadMessagesCount[otherUserId] = {
      count: messagesSnapshot.size,
      hasUnread: messagesSnapshot.size > 0,
    };

    const unreadCount = messagesSnapshot.docs.filter(
      (msg) => msg.data().sender !== currentUser.uid
    ).length;

    // const lastMessageSender =
    //   messagesSnapshot.docs.length > 0
    //     ? messagesSnapshot.docs[messagesSnapshot.docs.length - 1].data().sender
    //     : null;

    unreadMessagesCount[otherUserId] = {
      count: messagesSnapshot.size,
      lastMessageSender:
        messagesSnapshot.size > 0
          ? messagesSnapshot.docs[0].data().sender
          : null,
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
        // First, fetch all conversations for the current user
        const conversationsRef = collection(db, "conversations");
        const conversationsQuery = query(
          conversationsRef,
          where("participants", "array-contains", currentUser.uid)
        );
        const conversationsSnapshot = await getDocs(conversationsQuery);

        // Get the UIDs of users you've had conversations with
        const conversedUserIds = new Set(
          conversationsSnapshot.docs.flatMap((doc) =>
            doc.data().participants.filter((id) => id !== currentUser.uid)
          )
        );

        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs
          .map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
          .filter((user) => conversedUserIds.has(user.uid));

        const unreadCounts = await fetchUnreadMessagesCount(currentUser);
        setUnreadMessages(unreadCounts);

        // Sort users to place the current user at the top
        const sortedUsers = usersList.sort((a, b) => {
          // if (a.uid === currentUser.uid) return -1;
          // if (b.uid === currentUser.uid) return 1;
          if (unreadCounts[a.uid]?.hasUnread && !unreadCounts[b.uid]?.hasUnread)
            return -1;
          if (!unreadCounts[a.uid]?.hasUnread && unreadCounts[b.uid]?.hasUnread)
            return 1;
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

  const handleSelectUser = async (userId) => {
    await markMessagesAsRead(currentUser.uid, userId);
    const updatedUnreadCounts = await fetchUnreadMessagesCount(currentUser);
    setUnreadMessages(updatedUnreadCounts);
    onSelectUser(userId);
  };

  const formatUserId = (userId) => {
    if (userId.length <= 11) return userId; // Return as is if it's already short
    return `${userId.slice(0, 5)}...${userId.slice(-5)}`;
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <SpinnerLarge />
      </div>
    ); // Or any loading state/UI
  }

  return (
    <div className="mx-10">
      {users.length === 0 ? (
        <div>
          <p className="italic flex items-center justify-center mt-20">
            You have no messages yet...
          </p>
        </div>
      ) : (
        <ul className="">
          {users.map((user) => (
            <div
              onClick={() => handleSelectUser(user.uid)}
              key={user.uid}
              className="cursor-pointer max-w-80 sm:border-b-4 hover:bg-slate-300 sm:rounded-2xl py-1 px-2"
            >
              <li className="my-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={user.photoURL ? user.photoURL : Default.src}
                    alt="profile"
                    width={30}
                    height={30}
                    className="max-w-8 max-h-8 rounded-full"
                  />
                  <span>
                    {user.inputValue || formatUserId(user.uid)}{" "}
                    {user.uid === currentUser.uid && "(Me)"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {unreadMessages[user.uid] &&
                    unreadMessages[user.uid].count > 0 && (
                      <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {unreadMessages[user.uid].count}
                      </span>
                    )}
                </div>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
