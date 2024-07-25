import { useEffect, useRef, useState } from "react";

export function useCountDown({ timeToCount = 60000, interval = 1000 }) {

  const [timeLeft, setTimeLeft] = useState(timeToCount);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const hasStarted = useRef(false)

  useEffect(() => () => clearInterval(intervalId), []);

  function start() {
    console.log('start called');
    
    if (hasStarted.current) return;
    
    const id = setInterval(() => {
      if (timeLeft <= interval) {
        clear();
      }

      setTimeLeft(t =>  Math.max(t - interval, 0));
    }, interval);

    setIntervalId(id);
    hasStarted.current = true;
  }

  function reset() {
    console.log('reset called');

    clear();
    setTimeLeft(timeToCount);
    hasStarted.current = false;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft - 60000 * minutes) / 1000);
  const formattedTimeLeft = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return { timeLeft, formattedTimeLeft, start, reset , hasStarted:hasStarted.current };

  function clear() {
    if (intervalId === undefined) return;
    clearInterval(intervalId);
    setIntervalId(undefined);
  }
}
