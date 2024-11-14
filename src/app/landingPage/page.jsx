import CarouselComp from "@/components/carouselComp/page";
import LandingNav from "@/components/landingNav/page";
import Image from "next/image";
import React from "react";
import LiveChat from "@/images/landing-chat.jpg";
import Footer from "@/components/footer/page";

const LandingPage = () => {
  return (
    <div className="relative">
      <LandingNav />
      <CarouselComp />
      <section className="sm:m-16 mx-3 my-16 flex flex-col sm:flex-row items-center gap-5">
        <h1 className="sm:w-1/2 sm:text-7xl text-5xl font-bold font-serif text-[#FF5C00] text-center sm:text-left">
          LIVE CHAT <br /> WITH <br /> FASHION DESIGNERS
        </h1>
        <Image
          src={LiveChat}
          height={300}
          width={300}
          alt="chat"
          className="sm:w-1/2 sm:h-96 w-full rounded-br-3xl rounded-bl-3xl"
        />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
