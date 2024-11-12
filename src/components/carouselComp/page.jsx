import React from "react";
import SlidingCarousel from "../slidingCarousel/page";
import AnkaraFemale from "@/images/meet-ankara-female.png";
import Bubu from "@/images/meet-bubu.png";
import FormalFemale from "@/images/meet-formal-female.png";
import ReadyFemale from "@/images/meet-ready-female.png";
import TradFemale from "@/images/meet-trad-female.png";
import Image from "next/image";

const CarouselComp = () => {
  return (
    <div className="mt-28 sm:mx-16 flex gap-16 mx-3">
      <SlidingCarousel autoPlayInterval={3000}>
        <div className="h-full w-full">
          <Image
            src={AnkaraFemale}
            width={300}
            height={300}
            alt="ankara"
            className="w-full h-full"
          />
        </div>
        <div className="h-full w-full ">
          <Image
            src={Bubu}
            width={300}
            height={300}
            alt="ankara"
            className="w-full h-full"
          />
        </div>
        <div className="h-full w-full ">
          <Image
            src={FormalFemale}
            width={300}
            height={300}
            alt="ankara"
            className="w-full h-full"
          />
        </div>
        <div className="h-full w-full ">
          <Image
            src={ReadyFemale}
            width={300}
            height={300}
            alt="ankara"
            className="w-full h-full"
          />
        </div>
        <div className="h-full w-full ">
          <Image
            src={TradFemale}
            width={300}
            height={300}
            alt="ankara"
            className="w-full h-full"
          />
        </div>
      </SlidingCarousel>
      <div className="hidden sm:block sm:w-1/2">
        <div>
          <h1 className="text-7xl">THE BEST WAY TO STYLE AND GET STYLED</h1>
          <p className="my-3 pr-36">
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
  );
};

export default CarouselComp;
