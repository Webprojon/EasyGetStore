import React, { useState, createContext } from "react";

export const PromoContext = createContext(null);

export const PromoProvider = ({ children }) => {
  const [promo, setPromo] = useState("");

  return (
    <PromoContext.Provider value={{ promo, setPromo }}>
      {children}
    </PromoContext.Provider>
  );
};
