"use client";

import React, { useState } from "react";
import UserList from "../../../components/userList/page";
// import Chat from "../../../components/chat/chat";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import ChatWindow from "@/components/chatWindow/page";

const Dashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (uid) => {
    setSelectedUser(uid);
  };

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <UserList onSelectUser={handleSelectUser} />
        {selectedUser && <ChatWindow selectedUser={selectedUser} />}
      </div>
    </div>
  );
};

export default Dashboard;
