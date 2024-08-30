"use client";
import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext(0);


export const TokenProvider = ({ 
  children, 
  initialTokens 
} : {
  children: React.ReactNode, 
  initialTokens: number
}) => {
    const [tokens, setTokens] = useState(initialTokens); // initial token count
  
    return (
      <TokenContext.Provider value={{ tokens, setTokens }}>
        {children}
      </TokenContext.Provider>
    );
  };
  
  export const useTokens = () => useContext(TokenContext);