import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";

export default function Tasks() {
  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <h1>Tasks</h1>
      </div>
    </div>
  );
}
