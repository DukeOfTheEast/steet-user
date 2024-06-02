"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useState } from "react";
import Image from "next/image";
import Default from "@/images/default-image.png";
import EditImg from "@/images/edit-image.png";

export default function Settings() {
  const [selectedImage, setSelectedImage] = useState(Default);

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

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <h1>Settings</h1>
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
      </div>
    </div>
  );
}
