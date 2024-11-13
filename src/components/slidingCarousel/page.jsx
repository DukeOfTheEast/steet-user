"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { useCallback } from "react";
import { CarouselContext } from "@/context/CarouselContext";

const SlidingCarousel = ({ children, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const timerRef = useRef(null);
  // const [men, setMen] = useState(true);
  const { men, setMen } = useContext(CarouselContext);

  const handleNext = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % React.Children.count(children)
    );
  }, [children]);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timerRef.current);
  }, [autoPlayInterval, handleNext]);

  const menToggle = () => {
    setMen(true);
  };

  const womenToggle = () => {
    setMen(false);
  };

  return (
    <div className="relative w-full sm:w-1/2 h-[500px] overflow-hidden z-0">
      <div
        ref={carouselRef}
        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${
            currentIndex * (500 / React.Children.count(children))
          }%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="w-full h-full shrink-0 flex items-center justify-center"
            style={{ width: `${500 / React.Children.count(children)}%` }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="absolute top-4 right-4 border border-white rounded-3xl py-1 px-2 flex gap-2 z-1">
        <button
          onClick={menToggle}
          className={`${
            men ? "bg-[#FF5C00] rounded-3xl px-2 text-white" : ""
          }  `}
        >
          MEN
        </button>
        <button
          onClick={womenToggle}
          className={`${
            !men ? "bg-[#FF5C00] rounded-3xl px-2 text-white" : ""
          } `}
        >
          WOMEN
        </button>
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl bg-gray-600 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
        onClick={handlePrev}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl bg-gray-600 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
        onClick={handleNext}
      >
        &#8250;
      </button>
    </div>
  );
};

export default SlidingCarousel;
