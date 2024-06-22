"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useState, useEffect } from "react";
import Image from "next/image";
import Default from "@/images/default-image.png";
import EditImg from "@/images/edit-image.png";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/app/firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Edit from "@/images/edit-btn.png";
import { RiImageEditFill } from "react-icons/ri";
import { useProfile } from "@/context/ProfileContext";

export default function Settings() {
  // const [selectedImage, setSelectedImage] = useState(Default);
  // const [imageURL, setImageURL] = useState("");
  const { userInfo } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const { photoURL, setPhotoURL } = useProfile();

  const { currentUser, loading } = useAuth();
  const [userData, setUserData] = useState("");
  const [savedData, setSavedData] = useState("");

  const editUser = () => {
    setOpenEdit(true);
  };

  useEffect(() => {
    if (currentUser) {
      // Fetch user's saved data when component mounts
      const fetchUserData = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        if (docSnap.exists()) {
          setSavedData(docSnap.data().inputValue || "");

          // Update photoURL if user has a profile photo
          if (userData.photoURL) {
            setPhotoURL(userData.photoURL);
          }
        }
      };
      fetchUserData();
    }
  }, [currentUser, setPhotoURL]);

  const handleInputChange = (e) => {
    setUserData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser) {
      // Save data to Firestore
      try {
        const docRef = doc(db, "users", currentUser.uid);
        await setDoc(docRef, { inputValue: userData }, { merge: true });
        setSavedData(userData); // Update local state
        // alert("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data: ", error);
      }
      const userId = currentUser.uid;
    }
    setOpenEdit(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Reference to where the image will be stored in Firebase Storage
      const imageRef = ref(storage, `users/${currentUser.uid}/profile.jpg`);

      // Upload the file to Firebase Storage
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        null, // No need to track progress
        (error) => {
          console.error("Upload to Firebase failed:", error);
          alert("Failed to upload image to Firebase. Please try again.");
        },
        async () => {
          try {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setPhotoURL(downloadURL);

            // Update Firestore with the image URL
            await setDoc(
              doc(db, "users", currentUser.uid),
              { photoURL: downloadURL },
              { merge: true }
            );
          } catch (error) {
            console.error("Error uploading image: ", error);
            alert("Failed to upload image. Please try again.");
          }
        }
      );
    }
  };

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <div className="mt-4">
          <h2>Saved Data:</h2>
          <p>{savedData}</p>
        </div>
        <div className="mt-4">
          <h2>Upload Profile Picture:</h2>
          <input type="file" onChange={handleImageChange} />
        </div>
        {photoURL && (
          <div className="mt-4">
            <h2>Uploaded Image:</h2>
            <img src={photoURL} alt="profile" className="max-w-xs" />
          </div>
        )}

        {currentUser && (
          <div className="bg-gray-200 p-5 rounded-2xl sm:mr-20 my-10">
            {openEdit && (
              <form onSubmit={handleSubmit}>
                <label htmlFor="userInput">Enter something:</label>
                <input
                  id="userInput"
                  type="text"
                  value={userData}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 mb-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2"
                >
                  Save
                </button>
              </form>
            )}
            <div className="mt-4">
              <h2 className="font-extrabold">Email: {currentUser.email}</h2>
              <div className="flex items-center ">
                <h2 className="font-extrabold">
                  Username:
                  <span className="bg-gray-500 p-5 rounded-2xl">
                    {savedData}
                  </span>
                </h2>
                <Image
                  onClick={editUser}
                  src={Edit}
                  alt="edit-btn"
                  className="w-13 h-13 bg-gray-500 p-5 rounded-2xl cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
