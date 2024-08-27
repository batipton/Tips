"use client";
import { useState, useEffect } from "react";
import { timeUntilNextIncrement } from "@/app/utils/token-timer";
import { redeemTokens } from "@/app/lib/actions";

export default function CountdownTimer({redeem, userid}:{redeem:boolean, userid:string}) {
  
  function getTokens() {
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
            className="bg-white text-green-500 px-4 py-2 rounded-lg font-semibold"
          >
            Redeem Tokens
          </button>
        ) : (
          <p suppressHydrationWarning>More in  {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
        )
      }
    </>
  );
};

