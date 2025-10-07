"use client";
import { useState, useEffect } from "react";
import { timeUntilNextIncrement } from "@/app/utils/token-timer";
import { redeemTokens } from "@/app/lib/actions";
import { useTokens } from '@/app/context/TokenContext';

export default function CountdownTimer({initialRedeem, userid}:{initialRedeem:boolean, userid:string}) {
  const { tokens, setTokens } = useTokens();
  const [redeem, setRedeem] = useState(initialRedeem);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isHydrated, setIsHydrated] = useState(false);
  
  function getTokens() {
    setTokens(tokens+15);
    setRedeem(!redeem);
    redeemTokens(userid);
  }

  useEffect(() => {
    // Mark as hydrated and set initial time
    setIsHydrated(true);
    setTimeRemaining(timeUntilNextIncrement());
    
    const intervalId = setInterval(() => {
      setTimeRemaining(timeUntilNextIncrement());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <>
      {redeem ? (
          <button
            onClick={getTokens}
            className="w-full bg-white text-green-600 px-3 py-2 rounded-md font-semibold text-xs hover:bg-green-50 transition-colors"
          >
            Redeem Tokens
          </button>
        ) : (
          <p className="text-green-100 text-center">
            {isHydrated ? (
              <>Next: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</>
            ) : (
              <>Next: --h --m --s</>
            )}
          </p>
        )
      }
    </>
  );
};

