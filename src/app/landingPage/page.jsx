import CarouselComp from "@/components/carouselComp/page";
import LandingNav from "@/components/landingNav/page";
import React from "react";

const LandingPage = () => {
  return (
    <div className="relative">
      <LandingNav />
      <CarouselComp />
    </div>
  );
};

export default LandingPage;
