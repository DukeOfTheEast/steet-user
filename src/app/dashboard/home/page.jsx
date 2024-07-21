"use client";

// import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { addDoc } from "firebase/firestore";
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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PostModal from "@/components/post-modal/page";

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

  return (
    <div className="sm:flex">
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <FiPlus size={30} onClick={() => setIsModalOpen(true)} />
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          currentUser={currentUser}
        />
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <img src={post.imageUrl} alt="Post" />
              <button onClick={() => handleLike(post.id)}>
                {post.likes.includes(currentUser.uid) ? "Unlike" : "Like"} (
                {post.likes.length})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
