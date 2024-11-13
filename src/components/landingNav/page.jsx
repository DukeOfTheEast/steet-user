"use client";

import Image from "next/image";
import React, { useState } from "react";
import MeetStyle from "@/images/MeetnStyle-removebg-preview.png";
import Link from "next/link";
import { MenuIcon, X, ArrowRight } from "lucide-react";

const LandingNav = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
    console.log(toggleMenu);
  };

  return (
    <div className="flex items-center justify-between sm:pr-10 sm:pl-5 pr-4 shadow-md fixed top-0 left-0 right-0 bg-white z-50">
      <Image
        src={MeetStyle}
        width={300}
        height={300}
        alt="meet"
        className="w-24 h-24"
      />
      <div className="hidden sm:block">
        <div className="flex gap-10 text-[#FF5C00] font-semibold font-mono">
          <Link href={"/"}>How it works</Link>
          <Link href={"/"}>Features</Link>
          <Link href={"/"}>FAQ</Link>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex gap-2">
          <Link href={"/sign-up"}>
            <button className="border border-[#FF5C00] py-2 px-4 rounded-lg text-[#FF5C00]">
              Sign Up
            </button>
          </Link>
          <Link href={"/signin"}>
            <button className="bg-[#FF5C00] text-white py-2 px-4 rounded-lg">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <div className="sm:hidden cursor-pointer">
        {toggleMenu ? (
          <X onClick={handleToggle} size={30} />
        ) : (
          <MenuIcon onClick={handleToggle} size={30} />
        )}
      </div>

      {/* NAV FOR SMALL SCREENS */}
      <div className="sm:hidden w-full top-24 fixed">
        <div
          className={`flex flex-col transition-all duration-500 ${
            toggleMenu
              ? "max-h-[9999px] opacity-100 translate-y-0"
              : "max-h-0 hidden -translate-y-4"
          } mx-auto bg-white p-3 py-7 gap-4 shadow-md absolute w-full`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 text-[#FF5C00]">
              <div className="flex items-center gap-2">
                <ArrowRight size={20} />
                <Link href={"/"}>How it works</Link>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={20} />
                <Link href={"/"}>Features</Link>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight size={20} />
                <Link href={"/"}>FAQ</Link>
              </div>
            </div>
            <Link href={"/signup"}>
              <button className="w-full mt-5 border border-[#FF5C00] rounded-md px-3 py-2 text-[#FF5C00] sm:mr-2">
                Sign Up
              </button>
            </Link>
            <Link href={"/login"}>
              <button className="mb-2 w-full bg-[#FF5C00] rounded-md px-3 py-2 text-white">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNav;
