'use client'
import { useState, useEffect } from 'react';
import { timeUntilNextIncrement } from '@/app/utils/token-timer';

export default function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(timeUntilNextIncrement());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(timeUntilNextIncrement());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <p suppressHydrationWarning>More in  {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
  );
};

