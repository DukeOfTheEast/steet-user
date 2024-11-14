import Image from "next/image";
import React from "react";
import MeetStyle from "@/images/MeetnStyle-removebg-preview.png";
import Link from "next/link";
import { ArrowRight, FacebookIcon, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-[#f09d6e] flex flex-col sm:flex-row sm:justify-between sm:items-center py-5 px-3 text-white">
      <Image
        src={MeetStyle}
        width={300}
        height={300}
        alt="meet"
        className="w-24 h-24"
      />
      <div className="flex flex-col my-5 sm:my-0 gap-3">
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
      <div>
        <div className="flex gap-3">
          <FacebookIcon />
          <Instagram />
          <Twitter />
        </div>
        <p className="mt-5">Copyright 2024. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
