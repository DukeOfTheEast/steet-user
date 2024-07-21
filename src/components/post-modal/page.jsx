import React, { useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostModal = ({ isOpen, onClose, currentUser }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [text, setText] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image && !text.trim()) return;

    const storage = getStorage();
    const storageRef = ref(storage, `posts/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
      const uploadedImageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "posts"), {
        imageUrl: uploadedImageUrl,
        text: text.trim(),
        likes: [],
        createdBy: currentUser.uid,
        createdAt: new Date(),
      });

      setImage(null);
      setImageUrl(null);
      setText("");
      onClose();
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
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
