"use client";

import React, { useState } from "react";

export default function ProgressBar({ steps, currentStep }) {
  return (
    <div className="flex justify-between items-center mb-8 max-w-md mx-auto">
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ease-in-out
                ${
                  isActive ? "bg-black text-white" : "bg-gray-300 text-gray-600"
                }
              `}
              >
                {index + 1}
              </div>
              {/* <div
                className={`mt-2 text-xs transition-all duration-500 ease-in-out ${
                  isActive ? "text-black font-semibold" : "text-gray-500"
                }`}
              >
                {step}
              </div> */}
            </div>
            {!isLastStep && (
              <div
                className={`flex-1 h-1 transition-all duration-500 ease-in-out mx-2 ${
                  index < currentStep ? "bg-black" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
