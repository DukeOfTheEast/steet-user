import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";

export default function Catalogue() {
  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <h1>Catalogue</h1>
      </div>
    </div>
  );
}
