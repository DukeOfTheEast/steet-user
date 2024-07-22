import React, { useState, useEffect } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/context/AuthContext";

const PostModal = ({ isOpen, onClose, currentUser }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");
  const { currentUser: user } = useAuth();
  // const [users, setUsers] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let postImageUrl = "";

      if (image) {
        const storageRef = ref(storage, `posts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => reject(error),
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
      });

      setText("");
      setImage(null);
      setImageUrl("");
      onClose();
    } catch (error) {
      console.error("Error creating post: ", error);
    }
    console.log(user.inputValue);
    console.log(user.uid);
    console.log(user);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
      <div className="bg-white rounded-lg shadow-lg w-full sm:max-w-md max-w-sm">
        <div className="modal">
          <div className="">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            {imageUrl && (
              <div className="mb-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto rounded"
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
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
