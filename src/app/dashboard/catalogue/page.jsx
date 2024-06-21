"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useCat } from "@/context/CatContext";
import Styles from "@/images/styles.png";
import Fabric from "@/images/fabrics.png";
import Link from "next/link";
import Image from "next/image";

export default function Catalogue() {
  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20 mx-5 sm:mx-0">
        <h1 className="font-extrabold mb-7">Catalogue</h1>
        <h1>Select a folder</h1>
        <div className="sm:flex items-center justify-center gap-10">
          <Link href="/" className="text-center">
            <Image
              src={Styles}
              alt="Profile"
              className="mt-2"
              width={400}
              height={400}
            />
            <p className="text-[#b18e72] font-extrabold">Styles</p>
          </Link>
          <Link href="/" className="text-center">
            <Image
              src={Fabric}
              alt="Profile"
              className="mt-12 sm:mt-2"
              width={400}
              height={400}
            />
            <p className="text-[#b18e72] font-extrabold">Fabric Materials</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
