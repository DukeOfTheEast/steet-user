"use client";

import React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useAuth } from "@/context/AuthContext";
import { FiPlus } from "react-icons/fi";
import { db } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import PostModal from "@/components/post-modal/page";
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
import PostOptions from "@/components/postOptions/page";
// import { toast } from "react-toastify";
// import { toast } from "react-hot-toast";
// import { ToastBar, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      // Modify this part to update posts with bookmark status
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          isBookmarked: updatedBookmarks.includes(post.id),
        }))
      );

      setCurrentUser((prev) => ({
        ...prev,
        bookmarks: updatedBookmarks,
      }));
      toast.success(
        updatedBookmarks.includes(postId)
          ? "Post bookmarked!"
          : "Bookmark removed!"
      );
    } catch (error) {
      console.error("Error bookmarking post: ", error);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      async (snapshot) => {
        const postsList = await Promise.all(
          snapshot.docs.map(async (postDoc) => {
            const postData = { id: postDoc.id, ...postDoc.data() };

            // Check if this post is bookmarked by the current user
            const userRef = doc(db, "users", currentUser.uid);
            const userSnapshot = await getDoc(userRef);
            const currentBookmarks = userSnapshot.data()?.bookmarks || [];

            return {
              ...postData,
              isBookmarked: currentBookmarks.includes(postData.id),
            };
          })
        );

        setPosts(postsList);
        console.log(currentUser.role);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

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

      <div className="sm:pl-96 sm:pt-20 pt-24 sm:w-full">
        {currentUser?.role === "designer" ? (
          <FiPlus
            color="white"
            onClick={() => setIsModalOpen(true)}
            className="fixed sm:bottom-10 bottom-4 sm:right-10 right-4 bg-[#FF5C00] rounded-3xl shadow-lg cursor-pointer w-10 h-10 sm:w-14 sm:h-14"
          />
        ) : (
          ""
        )}
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentUser={currentUser}
        />
        <div className="max-h-36 sm:w-2/3 mx-4">
          <div>
            {posts.map((post) => (
              <div key={post.id} className="my-3 flex flex-col">
                <div className="relative flex items-center justify-between mb-2">
                  <div className="font-bold mb-2 flex items-center gap-2">
                    <Image
                      src={post.createdByProfileImage}
                      alt="profile"
                      className="max-w-8 max-h-8 rounded-full"
                      width={30}
                      height={30}
                    />
                    {/* <p>{post.createdByUsername}</p> */}
                    <p>{post.businessName}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-sm gap-1">
                      <GoLocation size={15} className="text-[#FF5C00]" />
                      <p className="text-xs">{post?.location?.state}</p>
                    </div>
                    <PostOptions
                      postId={post.id}
                      postOwnerId={post.createdBy}
                      currentUserId={currentUser?.uid}
                      onDelete={handleDelete}
                      onReport={(id) => console.log("Reported Post ID: ", id)}
                      onChat={() => {
                        const chatUrl = `/dashboard/orders?chat=${
                          post.createdByUsername || post.createdBy
                        }`;
                        console.log("Navigate to chat:", chatUrl);
                        window.location.href = chatUrl;
                      }}
                    />
                  </div>
                </div>
                <Link
                  href={`/${post.businessName}/post/${post.id}`}
                  className="cursor-pointer"
                >
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
                </Link>
                <div className="flex flex-row-reverse items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleLike(post.id)}>
                      {post.likes.includes(currentUser?.uid) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}{" "}
                    </button>
                    <p>{post.likes.length}</p>
                  </div>
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className="focus:outline-none"
                  >
                    {post.isBookmarked ? (
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
      </div>
    </div>
  );
};

export default Home;
