"use client";
import React, { createContext, useState, useContext } from 'react';

// const TokenContext = createContext(0);

interface TokenContextType {
  tokens: number;
  setTokens: React.Dispatch<React.SetStateAction<number>>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ 
  children, 
  initialTokens 
} : {
  children: React.ReactNode, 
  initialTokens: number
}) => {
    const [tokens, setTokens] = useState<number>(initialTokens); // initial token count
  
    return (
      <TokenContext.Provider value={{ tokens, setTokens }}>
        {children}
      </TokenContext.Provider>
    );
  };
  
  export const useTokens = () => {
    const context = React.useContext(TokenContext);
    if (context === undefined) {
      throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
  };