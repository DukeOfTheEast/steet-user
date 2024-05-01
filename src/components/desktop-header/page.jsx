import Image from "next/image";
import Link from "next/link";
import React from "react";
import Freeze from "@/images/freeze.png";

export const DesktopHeader = () => {
  return (
    <div className="pl-20 flex justify-between p-4 shadow-lg fixed top-0 left-0 w-full bg-white">
      <div></div>
      <div>
        <Link href="">
          <Image src={Freeze} alt="" className="w-8 h-8 rounded-full" />
        </Link>
      </div>
    </div>
  );
};
