"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, getDocs } from "firebase/firestore";

const UserList = ({ onSelectUser }) => {
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
            {user.inputValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
