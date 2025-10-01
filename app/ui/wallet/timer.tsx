"use client";
import { useState, useEffect } from "react";
import { timeUntilNextIncrement } from "@/app/utils/token-timer";
import { redeemTokens } from "@/app/lib/actions";
import { useTokens } from '@/app/context/TokenContext';

export default function CountdownTimer({initialRedeem, userid}:{initialRedeem:boolean, userid:string}) {
  const { tokens, setTokens } = useTokens();
  const [redeem, setRedeem] = useState(initialRedeem);
  function getTokens() {
    setTokens(tokens+15);
    setRedeem(!redeem);
    redeemTokens(userid);
  }

  const [timeRemaining, setTimeRemaining] = useState(timeUntilNextIncrement());

  useEffect(() => {
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
          <p suppressHydrationWarning className="text-green-100 text-center">
            Next: {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
          </p>
        )
      }
    </>
  );
};

