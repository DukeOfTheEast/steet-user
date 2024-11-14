"use client";

import React, { useContext } from "react";
import SlidingCarousel from "../slidingCarousel/page";
import AnkaraFemale from "@/images/meet-ankara-female.png";
import Bubu from "@/images/meet-bubu.png";
import FormalFemale from "@/images/meet-formal-female.png";
import ReadyFemale from "@/images/meet-ready-female.png";
import TradFemale from "@/images/meet-trad-female.png";
import Suits from "@/images/meet-suits-male.png";
import Street from "@/images/meet-street-male.png";
import TradMale from "@/images/meet-trad-male.png";
import TwoPiece from "@/images/meet-twopiece-male.png";
import Senator from "@/images/meet-senator-male.png";
import Image from "next/image";
import { CarouselContext } from "@/context/CarouselContext";

const CarouselComp = () => {
  const { men, setMen } = useContext(CarouselContext);

  return (
    <div className="">
      <div className="relative mt-28 sm:mx-16 flex gap-16 mx-3 items-center justify-center">
        {/* <div className="absolute top-4 left-4 bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-bold">Overlaid Content</h3>
        <p>This is the content that is overlaid on the image.</p>
      </div> */}
        {!men ? (
          <SlidingCarousel autoPlayInterval={3000}>
            <div className="relative h-full w-full">
              <Image
                src={AnkaraFemale}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">
                  ANKARA WEARS
                </h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  12 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={Bubu}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">BUBU FITS</h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  20 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={FormalFemale}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">
                  FORMAL WEAR
                </h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  12 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={ReadyFemale}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">
                  READY TO WEAR
                </h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  12 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={TradFemale}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">
                  TRADITIONAL WEARS
                </h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  12 DESIGNERS
                </p>
              </div>
            </div>
          </SlidingCarousel>
        ) : (
          <SlidingCarousel autoPlayInterval={3000}>
            <div className="relative h-full w-full">
              <Image
                src={Suits}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">SUITS</h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  31 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={Street}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">
                  STREET WEAR
                </h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  31 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={TradMale}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">
                  TRADITIONAL WEAR
                </h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  31 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={TwoPiece}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">TWO PIECE</h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  20 DESIGNERS
                </p>
              </div>
            </div>
            <div className="relative h-full w-full ">
              <Image
                src={Senator}
                width={300}
                height={300}
                alt="ankara"
                className="w-full h-full"
              />
              <div className="absolute bottom-4 left-4 p-4 rounded-md shadow-md">
                <h1 className="text-lg font-bold text-[#FF5C00]">SENATORS</h1>
                <p className="text-black border border-white rounded-3xl p-2">
                  31 DESIGNERS
                </p>
              </div>
            </div>
          </SlidingCarousel>
        )}

        <div className="hidden sm:block sm:w-1/2">
          <div>
            <h1 className="xl:text-7xl lg:text-6xl sm:text-4xl font-medium font-serif">
              <span className="text-[#FF5C00] italic">THE BEST</span> WAY <br />{" "}
              TO <span className="text-[#FF5C00] italic">STYLE</span> AND <br />{" "}
              GET <span className="text-[#FF5C00] italic">STYLED</span>
            </h1>
            <p className="my-5 lg:pr-36 font-serif">
              Meet ‘n’ Style is your all-in-one fashion retail design store to
              display and sell your fashion products and or services and connect
              with anyone in Nigeria.
            </p>
            <p className="text-[#FF5C00] italic">
              Meet your designers, style your clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComp;
