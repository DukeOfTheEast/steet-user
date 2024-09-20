"use client";

import React from "react";
import Navbar from "@/components/navbar/page";
import { DesktopHeader } from "@/components/desktop-header/page";
import { useState } from "react";
import ProgressBar from "@/components/progressBar/page";

export default function Tasks() {
  const [currentDiv, setCurrentDiv] = useState(0);

  const divContents = [
    "This is the content of the first div",
    "Here's the second div with different content",
    "And finally, the third div's content",
  ];

  const steps = ["Step 1", "Step 2", "Step 3"];

  const handleNext = () => {
    setCurrentDiv((prev) => (prev + 1) % divContents.length);
  };

  return (
    <div>
      <Navbar />
      <DesktopHeader />
      <div className="sm:pl-96 sm:pt-20 pt-20">
        <ProgressBar steps={steps} currentStep={currentDiv} />
        <div>
          <p className="border border-slate-500 rounded-md p-2 m-2 max-w-40">
            {divContents[currentDiv]}
          </p>
        </div>
        <button
          onClick={handleNext}
          className="bg-black text-white py-2 px-3 rounded-md"
        >
          {currentDiv === divContents.length - 1 ? "Check out" : "Next"}
        </button>
      </div>
    </div>
  );
}
