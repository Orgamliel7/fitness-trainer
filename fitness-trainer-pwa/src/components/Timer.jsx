import { useState, useEffect, useRef } from 'react';
import { playChangeSound } from '@/utils/sound';

export default function Timer({ duration = 5, isActive, isPaused, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  
  useEffect(() => {
    if (isActive && !isPaused) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
          
          // Play sound when time is almost up (at 1 second remaining)
          if (timeLeft === 2) {
            playChangeSound();
          }
        }, 1000);
      } else {
        onComplete();
        setTimeLeft(duration); // Reset timer for next exercise
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isActive, isPaused, duration, onComplete]);
  
  // Reset timer when duration changes (e.g., new exercise)
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);
  
  return timeLeft;
}