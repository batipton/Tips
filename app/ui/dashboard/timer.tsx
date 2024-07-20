'use client'
import { useState, useEffect } from 'react';
import { timeUntilNextIncrement } from '../../utils/token-timer';

export default function CountdownTimer() {
  const [timeRemaining, setTimeRemaining] = useState(timeUntilNextIncrement());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(timeUntilNextIncrement());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <bdi>{timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</bdi>
  );
};

