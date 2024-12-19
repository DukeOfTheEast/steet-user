"use client";

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsFillChatRightTextFill,
} from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { GoLocation } from "react-icons/go";

const Bookmarks = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkedPosts = () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Listen to changes in the user's bookmarks
        const userRef = doc(db, "users", currentUser.uid);
        const unsubscribeUser = onSnapshot(userRef, (userSnap) => {
          const bookmarks = userSnap.data()?.bookmarks || [];

          // If no bookmarks, set an empty list of posts and stop loading
          if (bookmarks.length === 0) {
            setPosts([]);
            setLoading(false);
            return;
          }

          // Listen to changes in posts that match the bookmarked IDs
          const postsRef = collection(db, "posts");
          const q = query(postsRef, where("__name__", "in", bookmarks));

          const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
            const postsList = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setPosts(postsList);
            setLoading(false);
          });

          // Cleanup function to unsubscribe from posts listener
          return () => {
            unsubscribePosts();
          };
        });

        // Cleanup function to unsubscribe from user listener
        return () => {
          unsubscribeUser();
        };
      } catch (error) {
        console.error("Error fetching bookmarked posts:", error);
        setLoading(false);
      }
    };

    fetchBookmarkedPosts();
  }, [currentUser]); // Re-fetch when currentUser changes

  const handleBookmark = async (postId) => {
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);

      // Check if post is already bookmarked
      const userDoc = await getDoc(userRef);
      const currentBookmarks = userDoc.data().bookmarks || [];

      const updatedBookmarks = currentBookmarks.includes(postId)
        ? currentBookmarks.filter((id) => id !== postId)
        : [...currentBookmarks, postId];

      await updateDoc(userRef, {
        bookmarks: updatedBookmarks,
      });

      setPosts((prevPosts) =>
        prevPosts
          .map((post) =>
            post.id === postId
              ? { ...post, isBookmarked: updatedBookmarks.includes(postId) }
              : post
          )
          .filter(
            (post) => updatedBookmarks.includes(post.id) || post.id !== postId
          )
      );

      // setCurrentUser((prev) => ({
      //   ...prev,
      //   bookmarks: updatedBookmarks,
      // }));

      // Optionally update local state if needed
    } catch (error) {
      console.error("Error bookmarking post: ", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      const post = posts.find((p) => p.id === postId);
      const updatedLikes = post.likes.includes(currentUser.uid)
        ? post.likes.filter((uid) => uid !== currentUser.uid)
        : [...post.likes, currentUser.uid];

      await updateDoc(postRef, { likes: updatedLikes });
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId ? { ...p, likes: updatedLikes } : p
        )
      );
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div className="sm:flex">
      <Navbar />
      <DesktopHeader />

      <div className="sm:pl-60 lg:pl-96 sm:pt-20 pt-24 w-full my-3">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center text-center justify-center p-10 mt-20">
            <BsBookmark className="text-6xl text-[#FF5C00] mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Bookmarks Yet
            </h2>
            <p className="text-gray-500 text-center">
              Looks like you haven`t bookmarked any posts. Start exploring and
              bookmark your favorite posts!
            </p>
          </div>
        ) : (
          <div className="max-h-36 sm:w-2/3 sm:ml-10 mx-4">
            <div>
              {posts.map((post) => (
                <div key={post.id} className="my-3 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold mb-2 flex items-center gap-2">
                      <Image
                        src={post.createdByProfileImage}
                        alt="profile"
                        className="max-w-8 max-h-8 rounded-full"
                        width={30}
                        height={30}
                      />
                      <p>{post.businessName || post.createdByUsername}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-sm gap-1">
                        <GoLocation size={15} className="text-[#FF5C00]" />
                        <p className="text-xs">{post?.location?.state}</p>
                      </div>
                      <EllipsisVertical size={25} className="cursor-pointer " />
                    </div>
                  </div>
                  {post.text && <p className="mb-4">{post.text}</p>}
                  {post.imageUrl && (
                    <Image
                      src={post.imageUrl}
                      alt="post"
                      className="w-full rounded-xl mb-4 max-h-96"
                      width={800}
                      height={800}
                    />
                  )}
                  <div className="flex flex-row-reverse items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleLike(post.id)}>
                        {post.likes.includes(currentUser.uid) ? (
                          <FaHeart />
                        ) : (
                          <FaRegHeart />
                        )}{" "}
                      </button>
                      <p>{post.likes.length}</p>
                    </div>
                    <button onClick={() => handleBookmark(post.id)}>
                      {currentUser?.bookmarks?.includes(post.id) ? (
                        <BsBookmarkFill size={20} />
                      ) : (
                        <BsBookmark size={20} />
                      )}
                    </button>
                  </div>
                  <hr className="mb-5" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
