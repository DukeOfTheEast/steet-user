import React from "react";
import { createContext, useContext } from "react";

export const CatContext = createContext();

export const useCat = () => useContext(CatContext);

const CatProvider = ({ children }) => {
  const word = "Oluebubechukwu";

  return <CatContext.Provider value={word}>{children}</CatContext.Provider>;
};

export default CatProvider;
