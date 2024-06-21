"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import Link from "next/link";
import Men from "@/components/men/page";
import Women from "@/components/women/page";
import { useState } from "react";

function Style() {
  const [openMen, setOpenMen] = useState(false);
  const [openWomen, setOpenWomen] = useState(false);

  const handleOpenMen = () => {
    setOpenMen(!openMen);
    setOpenWomen(false);
  };

  const handleOpenWomen = () => {
    setOpenWomen(!openWomen);
    setOpenMen(false);
  };

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-80 sm:pt-20 pt-20">
        <div className="mx-10 flex gap-8">
          <Link href="/dashboard/catalogue">
            <GoChevronLeft size={30} />
          </Link>
          <div className="flex items-center">
            <p>Catalogue</p>
            <GoChevronRight size={20} />
            <p>Style</p>
          </div>
        </div>
        <div className="m-10 space-y-5 font-extrabold">
          <div>
            <div
              onClick={handleOpenWomen}
              className="flex justify-between shadow-xl p-3 rounded-xl cursor-pointer"
            >
              <p>Women</p>
              {openWomen ? (
                <GoChevronDown size={30} />
              ) : (
                <GoChevronUp size={30} />
              )}
            </div>
            {openWomen && <Women />}
          </div>
          <div>
            <div
              onClick={handleOpenMen}
              className="flex justify-between p-3 shadow-xl rounded-xl cursor-pointer"
            >
              <p>Men</p>
              {openMen ? (
                <GoChevronDown size={30} />
              ) : (
                <GoChevronUp size={30} />
              )}
            </div>
            {openMen && <Men />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Style;
