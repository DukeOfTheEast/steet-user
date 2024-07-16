"use client";

import React, { useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const moveToNext = () => {
    if (progress < 100) {
      setProgress(progress + 1);
    }
  };

  return (
    <div className="sm:ml-28 my-5">
      <div className="w-2/3 bg-gray-200 rounded-full h-8">
        <div
          className={`${
            progress === 100 ? "bg-green-500" : "bg-blue-500"
          } h-8 rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button onClick={moveToNext}>Next</button>
    </div>
  );
};

export default ProgressBar;
