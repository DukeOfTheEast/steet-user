import React from "react";

const SpinnerLarge = () => {
  return (
    <div className="flex justify-center items-center my-0.5">
      <div className="w-20 h-20 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerLarge;
