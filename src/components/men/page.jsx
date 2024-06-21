import React from "react";
import MenOne from "@/images/men1.png";
import MenTwo from "@/images/men2.png";
import MenThree from "@/images/men3.png";
import MenFour from "@/images/men4.png";
import MenFive from "@/images/men5.png";
import MenSix from "@/images/men6.png";
import MenSeven from "@/images/men7.png";
import MenEight from "@/images/men8.png";
import Image from "next/image";

function Men() {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <Image src={MenOne} alt="edit" />
      <Image src={MenTwo} alt="edit" />
      <Image src={MenThree} alt="edit" />
      <Image src={MenFour} alt="edit" />
      <Image src={MenFive} alt="edit" />
      <Image src={MenSix} alt="edit" />
      <Image src={MenSeven} alt="edit" />
      <Image src={MenEight} alt="edit" />
    </div>
  );
}

export default Men;
