"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useCat } from "@/context/CatContext";

export default function Orders() {
  const word = useCat();

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <h1>Orders</h1>
        <h1>{word}</h1>
      </div>
    </div>
  );
}
