"use client";

import { React, useState } from "react";
import Image from "next/image";
import Logo from "@/images/steet-logo.png";
import Link from "next/link";
import Dash from "@/images/dashboard.png";
import Folder from "@/images/folder.png";
import Orders from "@/images/orders.png";
import Tasks from "@/images/task-list.png";
import Catalogue from "@/images/catalogue.png";
import Settings from "@/images/settings.png";
import Logout from "@/images/logout.png";
import Cancel from "@/images/cancel.png";
import { usePathname } from "next/navigation";
import Hamburger from "@/images/hamburger.png";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => path === pathname;

  const handleLogout = async () => {
    try {
      await auth.logout();
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {/* DESKTOP VIEW OF THE NAVBAR */}
      <div className="hidden sm:block px-12 bg-[#2b2b29] h-screen fixed z-50">
        <Image src={Logo} alt="logo" className="w-48 h-20 mx-30" />
        <div className="mx-16 flex flex-col gap-8 my-16 text-neutral-50">
          <Link
            href="/dashboard/home"
            className={isActive("/dashboard/home") ? "active" : ""}
          >
            <div className="route flex gap-1">
              <Image src={Dash} alt="logo" />
              <p>Home</p>
            </div>
          </Link>
          <Link
            href="/dashboard/folder"
            className={isActive("/dashboard/folder") ? "active" : ""}
          >
            <div className="route flex gap-1">
              <Image src={Folder} alt="logo" />
              <p>Folder</p>
            </div>
          </Link>
          <Link
            href="/dashboard/orders"
            className={isActive("/dashboard/orders") ? "active" : ""}
          >
            <div className="route flex gap-1">
              <Image src={Orders} alt="logo" />
              <p>Chat</p>
            </div>
          </Link>
          <Link
            href="/dashboard/tasks"
            className={isActive("/dashboard/tasks") ? "active" : ""}
          >
            <div className="route flex gap-1">
              <Image src={Tasks} alt="logo" />
              <p>Tasks</p>
            </div>
          </Link>
          <Link
            href="/dashboard/catalogue"
            className={isActive("/dashboard/catalogue") ? "active" : ""}
          >
            <div className="route flex gap-1">
              <Image src={Catalogue} alt="logo" />
              <p>Catalogue</p>
            </div>
          </Link>
          <Link
            href="/dashboard/settings"
            className={isActive("/dashboard/settings") ? "active" : ""}
          >
            <div className="route flex gap-1">
              <Image src={Settings} alt="logo" />
              <p>Profile</p>
            </div>
          </Link>
        </div>
        <div className=" text-neutral-50 mx-16 mt-32">
          <button onClick={handleLogout} className="flex gap-1">
            <Image src={Logout} alt="logo" />
            <p>Logout</p>
          </button>
        </div>
      </div>

      {/* MOBILE VIEW OF THE NAVBAR */}
      <div className="sm:hidden bg-[#2b2b29]">
        <div className="flex justify-between items-center px-4 py-3 top-0 fixed z-50 w-full bg-[#2b2b29]">
          <Image src={Logo} alt="logo" className="" />
          <Image
            src={Hamburger}
            alt="ham"
            className="h-7 w-7 bg-slate-100 rounded-sm cursor-pointer"
            onClick={openMenu}
          />
        </div>
        {isOpen && (
          <div className="fixed z-50 bg-[#2b2b29] h-full w-full text-neutral-50 transform transition-transform ease-in-out duration-10000">
            <div className="flex justify-between items-center mx-4">
              <Image src={Logo} alt="" />
              <Image
                src={Cancel}
                alt=""
                className="w-10 h-10 bg-slate-50 rounded-2xl cursor-pointer"
                onClick={openMenu}
              />
            </div>
            <div className="mx-28 my-16 flex flex-col gap-5">
              <Link href="/dashboard/home">
                <p>Home</p>
              </Link>
              <Link href="/dashboard/folder">
                <p>Customer Folder</p>
              </Link>
              <Link href="/dashboard/orders">
                <p>Chat</p>
              </Link>
              <Link href="/dashboard/tasks">
                <p>Add Tasks</p>
              </Link>
              <Link href="/dashboard/catalogue">
                <p>Catalogue</p>
              </Link>
              <Link href="/dashboard/settings">
                <p>Profile</p>
              </Link>
            </div>
            <div className="mx-28 pt-20">
              <button onClick={handleLogout}>
                <p>Logout</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
