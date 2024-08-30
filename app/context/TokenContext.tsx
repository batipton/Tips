"use client";
import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();


export const TokenProvider = ({ children, num }) => {
    const [tokens, setTokens] = useState(num); // initial token count
  
    return (
      <TokenContext.Provider value={{ tokens, setTokens }}>
        {children}
      </TokenContext.Provider>
    );
  };
  
  export const useTokens = () => useContext(TokenContext);