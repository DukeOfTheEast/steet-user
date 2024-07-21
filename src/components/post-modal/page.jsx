import React, { useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostModal = ({ isOpen, onClose, currentUser }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const storage = getStorage();
    const storageRef = ref(storage, `posts/${image.name}`);
    try {
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, "posts"), {
        imageUrl,
        likes: [],
        createdBy: currentUser.uid,
        createdAt: new Date(),
      });

      setImage(null);
      onClose();
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleSubmit}>Post</button>
      </div>
    </div>
  );
};

export default PostModal;
