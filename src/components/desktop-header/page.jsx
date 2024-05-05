import Image from "next/image";
import Link from "next/link";
import React from "react";
import Freeze from "@/images/freeze.png";
import Logo from "@/images/steet-logo.png";

export const DesktopHeader = () => {
  return (
    <div className="hidden sm:block">
      <div className="flex justify-between p-5 shadow-lg fixed top-0 left-0 w-full bg-white">
        {/* <div>
        <Image src={Logo} alt="logo" className="bg-black w-30 h-10" />
      </div> */}
        <div></div>
        <div>
          <Link href="">
            <Image src={Freeze} alt="" className="w-8 h-8 rounded-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};