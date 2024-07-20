export const timeUntilNextIncrement = () => {
    const now = new Date();
    const nextIncrement = new Date();
    nextIncrement.setUTCHours(18, 0, 0, 0); // Set to midnight UTC
    if (now >= nextIncrement) {
      nextIncrement.setUTCDate(nextIncrement.getUTCDate() + 1);
    }
    const difference = nextIncrement.getTime() - now.getTime();
    const hours = Math.floor(difference / 1000 / 60 / 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { hours, minutes, seconds };
};