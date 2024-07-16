"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Freeze from "@/images/freeze.png";
import Logo from "@/images/steet-logo.png";
import Logout from "@/images/logout.png";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { useProfile } from "@/context/ProfileContext";

export const DesktopHeader = () => {
  // const photoURL = useImage();
  const { photoURL, setPhotoURL } = useProfile();
  const [isHovered, setIsHovered] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="hidden sm:block">
      <div className="flex justify-between p-5 shadow-lg fixed top-0 left-0 w-full bg-white">
        {/* <div>
        <Image src={Logo} alt="logo" className="bg-black w-30 h-10" />
      </div> */}
        <div></div>
        <div className="inline-block">
          <Link href="/dashboard/settings">
            <img
              src={photoURL}
              alt=""
              className="w-8 h-8 rounded-full"
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            />
          </Link>

          {isHovered && (
            <div
              className=" absolute right-10 mb-2 w-48 p-2 pr-2 bg-slate-300 rounded-s-2xl shadow-xl text-black"
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
            >
              <Link href="/dashboard/settings">
                <p>Settings</p>
              </Link>
              <button onClick={handleLogout} className="flex gap-1 mt-3">
                <Image src={Logout} alt="logo" />
                <p>Logout</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
