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
} from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PostModal from "@/components/post-modal/page";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";
import { BsFillChatRightTextFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

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

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg"; // You can set a more dynamic name if needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image: ", error);
    }
  };

  return (
    <div className="sm:flex">
      <Navbar />
      <DesktopHeader />

      <div className="sm:pl-96 sm:pt-20 pt-20">
        <FiPlus
          onClick={() => setIsModalOpen(true)}
          className="fixed sm:bottom-10 bottom-4 sm:right-10 right-4 bg-slate-100 rounded-xl shadow-lg cursor-pointer w-10 h-10 sm:w-16 sm:h-16"
        />
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentUser={currentUser}
        />
        <div className="max-h-36 sm:w-2/3 mx-4">
          <div>
            {posts.map((post) => (
              <div key={post.id} className="my-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-bold mb-2 flex items-center gap-2">
                    <Image
                      src={post.createdByProfileImage}
                      alt="profile"
                      className="max-w-8 max-h-8 rounded-full"
                      width={30}
                      height={30}
                    />
                    <p>@{post.createdByUsername}</p>
                  </div>
                  <Link
                    href={`/dashboard/orders?chat=${
                      post.createdByUsername || post.createdBy
                    }`}
                  >
                    <BsFillChatRightTextFill size={25} />
                  </Link>
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
                  <button
                    onClick={() => handleDownload(post.imageUrl)}
                    className=""
                  >
                    <AiOutlineDownload size={20} />
                  </button>
                  <div>
                    {post.createdBy === currentUser.uid && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        className=""
                      >
                        <AiOutlineDelete size={20} className="mr-2" />
                      </button>
                    )}
                  </div>
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
