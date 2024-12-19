"use client";

import { React, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import Dash from "@/images/dashboard.png";
// import Folder from "@/images/folder.png";
// import Orders from "@/images/orders.png";
// import Tasks from "@/images/task-list.png";
// import Catalogue from "@/images/catalogue.png";
// import Settings from "@/images/settings.png";
// import Logout from "@/images/logout.png";
// import Cancel from "@/images/cancel.png";
import Meet from "@/images/MeetnStyle-removebg-preview.png";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookMarked,
  FolderArchive,
  Home,
  LogOut,
  LogOutIcon,
  Logs,
  MenuIcon,
  MessageCircle,
  Settings2,
  X,
} from "lucide-react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const auth = useAuth();
  const router = useRouter();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // const openMenu = () => {
  //   setIsOpen(!isOpen);
  // };

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
      <div className="hidden sm:block lg:px-12 h-screen fixed z-50 bg-white shadow-lg">
        <Image src={Meet} alt="logo" className="w-48 h-20 mx-30" priority />
        <div className="mx-16 flex flex-col gap-8 my-16 text-black font-bold text-lg">
          <Link
            href="/dashboard/home"
            className={isActive("/dashboard/home") ? "active" : ""}
          >
            <div className="route flex gap-1">
              {/* <Image src={Dash} alt="logo" /> */}
              <Home size={25} />
              <p className="hidden lg:block">Home</p>
            </div>
          </Link>
          <Link
            href="/dashboard/folder"
            className={isActive("/dashboard/folder") ? "active" : ""}
          >
            <div className="route flex gap-1">
              {/* <Image src={Folder} alt="logo" /> */}
              <FolderArchive size={25} />
              <p className="hidden lg:block">Folder</p>
            </div>
          </Link>
          <Link
            href="/dashboard/orders"
            className={isActive("/dashboard/orders") ? "active" : ""}
          >
            <div className="route flex gap-1">
              {/* <Image src={Orders} alt="logo" /> */}
              <MessageCircle size={25} />
              <p className="hidden lg:block">Chat</p>
            </div>
          </Link>
          <Link
            href="/dashboard/bookmarks"
            className={isActive("/dashboard/bookmarks") ? "active" : ""}
          >
            <div className="route flex gap-1">
              {/* <Image src={Tasks} alt="logo" /> */}
              <Bookmark size={25} />
              <p className="hidden lg:block">Bookmarks</p>
            </div>
          </Link>
          <Link
            href="/dashboard/catalogue"
            className={isActive("/dashboard/catalogue") ? "active" : ""}
          >
            <div className="route flex gap-1">
              {/* <Image src={Catalogue} alt="logo" /> */}
              <Logs size={25} />
              <p className="hidden lg:block">Catalogue</p>
            </div>
          </Link>
          <Link
            href="/dashboard/settings"
            className={isActive("/dashboard/settings") ? "active" : ""}
          >
            <div className="route flex gap-1">
              {/* <Image src={Settings} alt="logo" /> */}
              <Settings2 size={25} />
              <p className="hidden lg:block">Settings</p>
            </div>
          </Link>
        </div>
        <div className="text-lg mx-16 mt-24">
          <button onClick={handleLogout} className="flex gap-1">
            {/* <Image src={Logout} alt="logo" /> */}
            <LogOutIcon size={25} />
            <p className="hidden lg:block">Logout</p>
          </button>
        </div>
      </div>

      {/* MOBILE VIEW OF THE NAVBAR */}
      <div className="sm:hidden bg-[#2b2b29]">
        <div className="flex justify-between items-center pr-3 top-0 fixed z-40 w-full bg-white shadow-md">
          <Image src={Meet} alt="logo" className="w-24 h-24" />
          {isOpen ? (
            <X onClick={handleToggle} size={30} />
          ) : (
            <MenuIcon onClick={handleToggle} size={30} />
          )}
        </div>

        <div className="sm:hidden w-full top-24 fixed z-50">
          <div
            className={`flex flex-col transition-all duration-500 ${
              isOpen
                ? "max-h-[9999px] opacity-100 translate-y-0"
                : "max-h-0 hidden -translate-y-4"
            } mx-auto bg-white p-3 py-7 gap-4 shadow-md absolute w-full`}
          >
            <div className="flex flex-col gap-3">
              <div
                className="flex flex-col gap-4 text-[#FF5C00] font-bold"
                onClick={handleToggle}
              >
                <div className="flex items-center gap-1">
                  <Home size={20} />
                  <Link href={"/dashboard/home"}>Home</Link>
                </div>
                <div className="flex items-center gap-1">
                  <FolderArchive size={20} />
                  <Link href={"/dashboard/folder"}>Folder</Link>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={20} />
                  <Link href={"/dashboard/orders"}>Chat</Link>
                </div>
                <div className="flex items-center gap-1">
                  {/* <BsBookmarkFill size={20} />
                  <BsBookmark size={20} /> */}
                  <Bookmark size={20} />
                  <Link href={"/dashboard/bookmarks"}>Bookmarks</Link>
                </div>
                <div className="flex items-center gap-1">
                  <Logs size={20} />
                  <Link href={"/dashboard/catalogue"}>Catalogue</Link>
                </div>
                <div className="flex items-center gap-1">
                  <Settings2 size={20} />
                  <Link href={"/dashboard/settings"}>Settings</Link>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex gap-1 items-center justify-center w-full mt-5 border border-[#FF5C00] rounded-md px-3 py-2 text-[#FF5C00] sm:mr-2"
              >
                <LogOut size={20} />
                <p>Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
