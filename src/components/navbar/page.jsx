import React from "react";
import Image from "next/image";
import Logo from "@/images/steet-logo.png";
import Link from "next/link";
import Dash from "@/images/dashboard.png";
import Folder from "@/images/folder.png";
import Orders from "@/images/orders.png";
import Tasks from "@/images/task-list.png";
import Catalogue from "@/images/catalogue.png";
import Settings from "@/images/settings.png";

export default function Navbar() {
  return (
    <div>
      {/* DESKTOP VIEW OF THE NAVBAR */}
      <div className="hidden sm:block px-12 bg-[#2b2b29] h-screen fixed z-50">
        <Image src={Logo} alt="logo" className="w-48 h-20 mx-30" />
        <div className="mx-16 flex flex-col gap-6 my-16 text-neutral-50">
          <Link href="/" className="flex gap-1">
            <Image src={Dash} alt="logo" />
            <p>Dashboard</p>
          </Link>
          <Link href="/" className="flex gap-1">
            <Image src={Folder} alt="logo" />
            <p>Folder</p>
          </Link>
          <Link href="/" className="flex gap-1">
            <Image src={Orders} alt="logo" />
            <p>Orders</p>
          </Link>
          <Link href="/" className="flex gap-1">
            <Image src={Tasks} alt="logo" />
            <p>Tasks</p>
          </Link>
          <Link href="/" className="flex gap-1">
            <Image src={Catalogue} alt="logo" />
            <p>Catalogue</p>
          </Link>
          <Link href="/" className="flex gap-1">
            <Image src={Settings} alt="logo" />
            <p>Settings</p>
          </Link>
        </div>
        <div>
          <Link href="/" className="flex gap-1">
            <p>Logout</p>
          </Link>
        </div>
      </div>

      {/* MOBILE VIEW OF THE NAVBAR */}
      <div className="sm:hidden bg-yellow-500">
        <Image src={Logo} alt="logo" />
        <div className="hidden">
          <p>Dashboard</p>
          <p>Customer Folder</p>
          <p>Orders</p>
          <p>Add Tasks</p>
          <p>Catalogue</p>
          <p>Settings</p>
        </div>
        <div>
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}
