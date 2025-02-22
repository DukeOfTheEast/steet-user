"use client";

import React, { useState, useEffect } from "react";
import { db, storage } from "@/app/firebase/config";
import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";
import { FaTimes } from "react-icons/fa";
import Spinner from "../spinner/page";
import { useProfile } from "@/context/ProfileContext";
import Image from "next/image";
// import { Player } from "video-react";
import ReactPlayer from "react-player";

const PostModal = ({ isOpen, onClose, currentUser }) => {
  const [media, setMedia] = useState(null); // For image or video file
  const [mediaUrl, setMediaUrl] = useState(null); // Local preview URL
  const [mediaType, setMediaType] = useState(null); // "image" or "video"
  const [text, setText] = useState("");
  const { currentUser: user } = useAuth();
  const [postLoading, setPostLoading] = useState(false);
  const { photoURL, setPhotoURL } = useProfile();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        if (docSnap.exists() && userData.photoURL) {
          setPhotoURL(userData.photoURL);
        }
      };
      fetchUserData();
    }
  }, [currentUser, setPhotoURL]);

  const handleMediaChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setMedia(file);

      // Determine file type and set preview URL
      if (file.type.startsWith("image/")) {
        setMediaType("image");
        setMediaUrl(URL.createObjectURL(file));
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
        setMediaUrl(URL.createObjectURL(file));
      } else {
        alert("Please upload an image or video file.");
        setMedia(null);
        setMediaUrl(null);
        setMediaType(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    try {
      let postMediaUrl = "";
      let postMediaType = "";

      if (media) {
        const storageRef = ref(storage, `posts/${media.name}`);
        const uploadTask = uploadBytesResumable(storageRef, media);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              console.error("Error uploading media: ", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                postMediaUrl = downloadURL;
                postMediaType = mediaType;
                resolve();
              });
            }
          );
        });
      }

      await addDoc(collection(db, "posts"), {
        text,
        mediaUrl: postMediaUrl, // Store Firebase URL
        mediaType: postMediaType, // Store type for rendering downstream
        createdBy: user.uid,
        createdByUsername: user.inputValue || "Anonymous",
        createdAt: Timestamp.now(),
        likes: [],
        createdByProfileImage: photoURL || user.photoURL,
        location: {
          state: user.selectedState || null,
        },
        businessName: user.businessName,
        fullName: user.fullName,
      });

      setText("");
      setMedia(null);
      setMediaUrl(null);
      setMediaType(null);
      onClose();
    } catch (error) {
      console.error("Error creating post: ", error);
    } finally {
      setPostLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-md max-w-sm">
        <div className="modal p-2">
          <div>
            <FaTimes
              size={40}
              className="cursor-pointer p-2"
              onClick={onClose}
            />
            {mediaUrl && (
              <div className="mb-4">
                {mediaType === "image" ? (
                  <Image
                    src={mediaUrl}
                    alt="Preview"
                    className="w-full h-auto max-h-72 rounded"
                    width={300}
                    height={300}
                  />
                ) : mediaType === "video" ? (
                  <ReactPlayer
                    url={mediaUrl}
                    controls={true}
                    playing={true}
                    loop={true}
                    muted={true}
                    width="100%"
                    height="100%"
                    className="rounded-lg shadow-lg"
                  />
                ) : null}
              </div>
            )}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              className="mb-4 border border-gray-300 rounded p-2 w-full resize-none"
              rows="3"
            />
            <div className="flex items-center justify-between">
              <input
                type="file"
                accept="image/*,video/*" // Accept both image and video
                onChange={handleMediaChange}
              />
              <button
                onClick={handleSubmit}
                className="bg-[#FF5C00] text-white px-4 py-2 rounded hover:bg-[#eead88]"
                disabled={postLoading}
              >
                {postLoading ? <Spinner /> : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
