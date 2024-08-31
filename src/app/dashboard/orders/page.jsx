"use client";
import React, { useState, useEffect } from "react";
import UserList from "@/components/userList/page";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import ChatWindow from "@/components/chatWindow/page";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const Orders = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  // const router = useRouter();

  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();

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

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  // useEffect(() => {
  //   const handleHashChange = () => {
  //     const hash = window.location.hash.slice(1); // Remove the '#' character
  //     setSelectedUser(hash || null);
  //   };

  //   // Set initial state
  //   handleHashChange();

  //   // Listen for hash changes
  //   window.addEventListener("hashchange", handleHashChange);

  //   // Cleanup
  //   return () => window.removeEventListener("hashchange", handleHashChange);
  // }, []);

  // const handleSelectUser = (uid) => {
  //   window.location.hash = uid;
  // };

  // const closeChat = () => {
  //   window.location.hash = "";
  // };
  useEffect(() => {
    if (users.length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      const chatParam = searchParams.get("chat");
      console.log("URL:", window.location.href);
      console.log("chatParam:", chatParam);
      console.log("users:", users);
      if (chatParam) {
        const user = users.find(
          (u) => u.inputValue === chatParam || u.uid === chatParam
        );
        console.log("Matched User:", user);
        if (user) {
          setSelectedUser(user.uid);
        }
      }
    }
  }, [users]);

  const handleSelectUser = (uid) => {
    const user = users.find((u) => u.uid === uid);
    if (user) {
      setSelectedUser(uid);
      const urlParam = user.inputValue || uid;
      window.history.pushState(null, "", `/dashboard/orders?chat=${urlParam}`);
    }
  };

  const closeChat = () => {
    setSelectedUser(null);
    window.history.pushState(null, "", "/dashboard/orders");
  };

  return (
    <div className="relative">
      <Navbar />
      <DesktopHeader />
      <div
        className={`sm:pl-96 sm:pt-20 pt-20 ${selectedUser ? "blur-sm" : ""}`}
      >
        <UserList onSelectUser={handleSelectUser} />
      </div>
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center w-full justify-center">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <ChatWindow selectedUser={selectedUser} closeChat={closeChat} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
