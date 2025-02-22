"use client";

import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GoLocation } from "react-icons/go";
import { ArrowLeft } from "lucide-react"; // Using Lucide React for a back icon
import PostOptions from "@/components/postOptions/page";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import ReactPlayer from "react-player";

export default function PostDetailPage() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", params.postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
          setPosts({ id: postSnap.id, ...postSnap.data() });
        } else {
          console.error("No such post!");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.postId]);

  const copyPostLink = () => {
    const postUrl = `${window.location.origin}/${post.businessName}/post/${post.id}`;

    navigator.clipboard
      .writeText(postUrl)
      .then(() => {
        alert("Post link copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const goBack = () => {
    router.push("/dashboard/home"); // Go back to the home/posts page
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  //   if (loading) return <div>Loading...</div>;
  //   if (!post) return <div>Post not found</div>;

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="container mx-auto p-4 pt-28">
        <div className="max-w-xl mx-auto">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={goBack}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-full"
            >
              <ArrowLeft size={24} />
              <span>Back to Posts</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src={post?.createdByProfileImage}
                alt="profile"
                className="max-w-8 max-h-8 rounded-full"
                width={30}
                height={30}
              />
              <p className="font-bold">{post?.businessName}</p>
            </div>
            <div className="flex items-center text-sm gap-1">
              <GoLocation size={15} className="text-[#FF5C00]" />
              <p>{post?.location?.state}</p>
              <PostOptions
                postId={post?.id}
                postOwnerId={post?.createdBy}
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

          {post?.text && <p className="mb-4">{post?.text}</p>}

          {post?.mediaUrl && post?.mediaType === "image" && (
            <Image
              src={post?.mediaUrl}
              alt="post"
              className="w-full rounded-xl mb-4 max-h-96"
              width={800}
              height={800}
            />
          )}
          {post?.mediaUrl && post?.mediaType === "video" && (
            <div className="w-full mb-4">
              <ReactPlayer
                url={post.mediaUrl}
                controls={true}
                playing={false}
                loop={true}
                muted={false}
                width="100%"
                height="100%"
                className="rounded-md shadow-lg"
              />
            </div>
          )}
          {/* 
          {post?.imageUrl && (
            <Image
              src={post?.imageUrl}
              alt="post"
              className="w-full rounded-xl mb-4"
              width={800}
              height={800}
            />
          )} */}
          <div className="flex flex-row-reverse items-center justify-between">
            <div className="flex items-center gap-1">
              <button onClick={() => handleLike(post?.id)}>
                {post?.likes.includes(currentUser?.uid) ? (
                  <FaHeart />
                ) : (
                  <FaRegHeart />
                )}{" "}
              </button>
              <p>{post?.likes.length}</p>
            </div>
            <button
              onClick={() => handleBookmark(post?.id)}
              className="focus:outline-none"
            >
              {post?.isBookmarked ? (
                <BsBookmarkFill size={20} />
              ) : (
                <BsBookmark size={20} />
              )}
            </button>
          </div>
          <hr className="mb-5 mt-2" />

          <div className="flex justify-between items-center mt-5">
            <div></div>
            <button
              onClick={copyPostLink}
              className="bg-[#FF5C00] text-white px-4 py-2 rounded"
            >
              Copy Post Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
