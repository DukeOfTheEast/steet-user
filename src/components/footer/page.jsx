import Image from "next/image";
import React from "react";
import MeetStyle from "@/images/MeetnStyle-removebg-preview.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  ArrowRight,
  FacebookIcon,
  Github,
  Instagram,
  Linkedin,
  X,
  Youtube,
} from "lucide-react";
import Twitter from "@/images/Twitter.png";

const Footer = () => {
  return (
    <div className="bg-[#FF5C00] flex flex-col sm:flex-row sm:justify-between sm:items-center sm:p-16 py-5 px-3 text-white">
      <div className="flex flex-col">
        <Image
          src={MeetStyle}
          width={300}
          height={300}
          alt="meet"
          className="w-24 h-24"
        />
        <div>
          <p className="text-lg mb-2">Subscribe to our newsletter</p>
          <div className="bg-white rounded-2xl p-1 inline-block gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="rounded-xl focus:outline-none text-black"
            />
            <button className="bg-[#FF5C00] p-2 rounded-2xl">Submit</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-10 sm:my-0 gap-3">
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
          <Link href={"https://www.facebook.com"}>
            <FacebookIcon />
          </Link>
          <Link href={"https://www.instagram.com"}>
            <Instagram />
          </Link>
          <Link href={"https://www.x.com/Ukach_Ebuka"}>
            <FontAwesomeIcon icon={faXTwitter} size="2x" className="w-6 h-6" />
          </Link>
          <Link href={"https://www.x.com/Ukach_Ebuka"}>
            <Youtube />
          </Link>
          <Link href={"https://www.linkedin.com/in/ukachukwu-ebuka-660716190/"}>
            <Linkedin />
          </Link>
          <Link href={"https://www.github.com/DukeOfTheEast"}>
            <Github />
          </Link>
        </div>
        <p className="mt-5">Copyright 2024. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
