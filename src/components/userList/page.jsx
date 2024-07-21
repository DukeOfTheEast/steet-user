"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

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
      <h2 className="text-3xl font-extrabold text-center">Chat With Vendors</h2>
      <ul>
        {users.map((user) => (
          <li
            className="cursor-pointer"
            key={user.uid}
            onClick={() => onSelectUser(user.uid)}
          >
            {user.inputValue} {user.uid === currentUser.uid && "(Me)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
