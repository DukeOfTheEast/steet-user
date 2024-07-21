"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineChat } from "react-icons/md";

const UserList = ({ onSelectUser }) => {
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

    fetchUsers();
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-center mb-6">
        Chat With Vendors
      </h2>
      <ul>
        {users.map((user) => (
          <div
            onClick={() => onSelectUser(user.uid)}
            key={user.uid}
            className="cursor-pointer flex items-center justify-between max-w-80 border-b-4 hover:bg-slate-300 rounded-2xl py-1 px-2"
          >
            <li className="my-2">
              {user.inputValue} {user.uid === currentUser.uid && "(Me)"}
            </li>
            <MdOutlineChat />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
