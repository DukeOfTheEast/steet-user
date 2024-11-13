"use client";

import { createContext, useState } from "react";

const CarouselContext = createContext();

const CarouselProvider = ({ children }) => {
  const [men, setMen] = useState(true);

  return (
    <CarouselContext.Provider value={{ men, setMen }}>
      {children}
    </CarouselContext.Provider>
  );
};

export { CarouselContext, CarouselProvider };
