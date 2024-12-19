"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { db, storage } from "@/app/firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Edit from "@/images/edit-btn.png";
import { useProfile } from "@/context/ProfileContext";
import { MdFileUpload } from "react-icons/md";
import { LocateFixed } from "lucide-react";
import { GoLocation } from "react-icons/go";

const updateUserPostsWithNewImage = async (userId, newPhotoURL) => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("createdBy", "==", userId));
  const querySnapshot = await getDocs(q);

  const batch = writeBatch(db);
  querySnapshot.forEach((doc) => {
    batch.update(doc.ref, { createdByProfileImage: newPhotoURL });
  });

  await batch.commit();
};

export default function Settings() {
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
    if (currentUser) {
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

              // Update all posts by this user with the new image URL
              await updateUserPostsWithNewImage(currentUser.uid, downloadURL);
            } catch (error) {
              console.error("Error uploading image: ", error);
              alert("Failed to upload image. Please try again.");
            }
          }
        );
      }
    }
  };

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-60 lg:pl-96 sm:pt-20 pt-20 font-serif">
        {/* <div className="mt-4">
          <h2>Saved Data:</h2>
          <p>{savedData}</p>
        </div> */}
        <h1 className="font-extrabold text-xl sm:text-3xl my-3 mb-6 font-serif">
          Settings
        </h1>
        <div className="bg-gray-300 mx-3 sm:w-2/3 rounded-2xl">
          <div className="flex items-center mx-10 gap-2">
            <div className="mt-4 text-sm font-bold">
              <p>JPEG or PNG</p>
              <p>File Size: Max. 5MB</p>
              <input
                type="file"
                id="file-input"
                onChange={handleImageChange}
                className="sm:w-56 w-28 sr-only"
              />
              <label
                htmlFor="file-input"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <MdFileUpload size={25} />
                <p>Upload</p>
              </label>
            </div>

            {photoURL && (
              <div className="mt-4">
                <img
                  src={photoURL}
                  alt="profile"
                  className="rounded-full sm:w-40 sm:h-40"
                />
              </div>
            )}
          </div>

          {currentUser && (
            <div className="p-5 rounded-2xl sm:mr-20 my-10">
              {openEdit && (
                <form onSubmit={handleSubmit} className="">
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
                {/* <h2 className="font-extrabold">User Id: {currentUser.uid}</h2> */}
                <div className="flex items-center ">
                  <h2 className="font-extrabold">Username: {savedData}</h2>
                  <Image
                    onClick={editUser}
                    src={Edit}
                    alt="edit-btn"
                    className="w-11 h-11 bg-slate-100 p-2 rounded-2xl cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* <p>Business name: {currentUser?.businessName}</p> */}
        </div>
      </div>
    </div>
  );
}
