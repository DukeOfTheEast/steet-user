"use client";

import React, { useState } from "react";
import { EllipsisVertical, MessageCircle } from "lucide-react";
import { GoReport } from "react-icons/go";

const PostOptions = ({
  postId,
  postOwnerId,
  currentUserId,
  onDelete,
  onReport,
  onChat,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Ellipsis Icon */}
      <EllipsisVertical
        size={25}
        className="cursor-pointer"
        onClick={toggleMenu}
      />

      {/* Pop-Up Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200">
          <ul className="text-sm text-gray-700">
            <li
              className="flex gap-1 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onReport(postId);
                setIsMenuOpen(false);
              }}
            >
              <GoReport size={20} />
              Report Post
            </li>
            {postOwnerId !== currentUserId && (
              <li
                className="flex gap-1 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChat();
                  setIsMenuOpen(false);
                }}
              >
                <MessageCircle size={20} />
                Chat Designer
              </li>
            )}
            {postOwnerId === currentUserId && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                onClick={() => {
                  onDelete(postId);
                  setIsMenuOpen(false);
                }}
              >
                Delete Post
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostOptions;
