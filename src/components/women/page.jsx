import React from "react";
import WomenOne from "@/images/women1.png";
import WomenTwo from "@/images/women2.png";
import WomenThree from "@/images/women3.png";
import WomenFour from "@/images/women4.png";
import WomenFive from "@/images/women5.png";
import WomenSix from "@/images/women6.png";
import WomenSeven from "@/images/women7.png";
import WomenEight from "@/images/women8.png";
import WomenNine from "@/images/women9.png";
import WomenTen from "@/images/women10.png";
import WomenEleven from "@/images/women11.png";
import WomenTwelve from "@/images/women12.png";
import Image from "next/image";

function Women() {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Image src={WomenOne} alt="edit" />
      <Image src={WomenTwo} alt="edit" />
      <Image src={WomenThree} alt="edit" />
      <Image src={WomenFour} alt="edit" />
      <Image src={WomenFive} alt="edit" />
      <Image src={WomenSix} alt="edit" />
      <Image src={WomenSeven} alt="edit" />
      <Image src={WomenEight} alt="edit" />
      <Image src={WomenNine} alt="edit" />
      <Image src={WomenTen} alt="edit" />
      <Image src={WomenEleven} alt="edit" />
      <Image src={WomenTwelve} alt="edit" />
    </div>
  );
}

export default Women;
