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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Edit from "@/images/edit-btn.png";

export default function Settings() {
  const [selectedImage, setSelectedImage] = useState(Default);
  const [imageURL, setImageURL] = useState("");
  const { userInfo } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  const { currentUser, loading } = useAuth();
  const [userData, setUserData] = useState("");
  const [savedData, setSavedData] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    // Check if a file is selected
    if (file) {
      // Validate file type (optional)
      if (file.type.startsWith("image/")) {
        // Set selected image
        setSelectedImage(URL.createObjectURL(file));
      } else {
        // Handle invalid file type
        alert("Please select an image file.");
      }
    }
  };

  const editUser = () => {
    setOpenEdit(true);
  };

  // const handleImageUpload = async () => {
  //   if (selectedImage && currentUser) {
  //     const storageRef = ref(storage, `users/${currentUser.uid}/profile.jpg`);
  //     try {
  //       // Upload the image to Firebase Storage
  //       await uploadBytes(storageRef, selectedImage);
  //       // Get the image's URL
  //       const url = await getDownloadURL(storageRef);
  //       setImageURL(url);

  //       // Save the URL to Firestore
  //       const docRef = doc(db, "users", currentUser.uid);
  //       await setDoc(docRef, { imageURL: url }, { merge: true });
  //       alert("Image uploaded successfully!");
  //     } catch (error) {
  //       console.error("Error uploading image: ", error);
  //       alert("Failed to upload image.");
  //     }
  //   }
  // };

  useEffect(() => {
    if (currentUser) {
      // Fetch user's saved data when component mounts
      const fetchUserData = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSavedData(docSnap.data().inputValue || "");
        }
      };
      fetchUserData();
    }
  }, [currentUser]);

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

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="profileImageInput"
        />
        <label
          htmlFor="profileImageInput"
          className="font-bold py-2 px-4 rounded cursor-pointer "
        >
          <Image src={EditImg} alt="edit" />
        </label>
        {selectedImage && (
          <div>
            <Image
              src={selectedImage}
              alt="Profile"
              className="mt-2 rounded-full"
              width={300}
              height={300}
            />
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
