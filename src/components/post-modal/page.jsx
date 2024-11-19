import React, { useState, useEffect } from "react";
import { db, storage } from "@/app/firebase/config";
import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAuth } from "@/context/AuthContext";
import { FaTimes } from "react-icons/fa";
import Spinner from "../spinner/page";
import { useProfile } from "@/context/ProfileContext";
import Image from "next/image";

const PostModal = ({ isOpen, onClose, currentUser }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");
  const { currentUser: user } = useAuth();
  const [postLoading, setPostLoading] = useState(false);
  const { photoURL, setPhotoURL } = useProfile();

  useEffect(() => {
    if (currentUser) {
      // Fetch user's saved data when component mounts
      const fetchUserData = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        if (docSnap.exists()) {
          if (userData.photoURL) {
            setPhotoURL(userData.photoURL);
          }
        }
      };
      fetchUserData();
    }
  }, [currentUser, setPhotoURL]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);
    try {
      let postImageUrl = "";

      if (image) {
        const storageRef = ref(storage, `posts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
              console.error("Error uploading image: ", error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                postImageUrl = downloadURL;
                resolve();
              });
            }
          );
        });
      }

      await addDoc(collection(db, "posts"), {
        text,
        imageUrl: postImageUrl,
        createdBy: user.uid,
        createdByUsername: user.inputValue || "Anonymous", // Assuming inputValue is the username
        createdAt: Timestamp.now(),
        likes: [],
        createdByProfileImage: photoURL || user.photoURL,
      });

      setText("");
      setImage(null);
      setImageUrl(null);
      onClose();
    } catch (error) {
      console.error("Error creating post: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
      <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-md max-w-sm">
        <div className="modal p-2">
          <div className="">
            {/* <span className="close w-10 h-10" onClick={onClose}>
              &times;
            </span> */}
            <FaTimes
              size={40}
              className="cursor-pointer p-2"
              onClick={onClose}
            />
            {imageUrl && (
              <div className="mb-4">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-72 rounded"
                  width={300}
                  height={300}
                />
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
              <input type="file" onChange={handleImageChange} />
              <button
                onClick={handleSubmit}
                className="bg-[#FF5C00] text-white px-4 py-2 rounded hover:bg-[#eead88]"
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
