// src/app/workout/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ExerciseScreen from '@/components/ExerciseScreen';
import Timer from '@/components/Timer';
import useWorkoutStore from '@/store/workoutStore';

export default function WorkoutPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5);
  
  const {
    initWorkout,
    startWorkout,
    pauseWorkout,
    resumeWorkout,
    nextExercise,
    finishWorkout,
    getCurrentExercise,
    isActive,
    isPaused,
    getWorkoutStats,
  } = useWorkoutStore();
  
  const currentExercise = getCurrentExercise();
  
  // Initialize workout
  useEffect(() => {
    initWorkout(10); // 10 random exercises
    startWorkout();
  }, [initWorkout, startWorkout]);
  
  // Timer logic
  const handleTimerComplete = () => {
    nextExercise();
  };
  
  const timerDuration = 5; // 5 seconds per exercise
  const currentTimerValue = Timer({
    duration: timerDuration,
    isActive,
    isPaused,
    onComplete: handleTimerComplete
  });
  
  useEffect(() => {
    setTimeLeft(currentTimerValue);
  }, [currentTimerValue]);
  
  // Handle workout completion
  useEffect(() => {
    if (!isActive && currentExercise === null) {
      // Save data to localStorage
      const stats = getWorkoutStats();
      localStorage.setItem('lastWorkout', JSON.stringify({
        timestamp: new Date().toISOString(),
        ...stats
      }));
      
      // Redirect to results page
      router.push('/results');
    }
  }, [isActive, currentExercise, getWorkoutStats, router]);
  
  const handlePauseToggle = () => {
    if (isPaused) {
      resumeWorkout();
    } else {
      pauseWorkout();
    }
  };
  
  const handleFinish = () => {
    finishWorkout();
  };
  
  if (!currentExercise) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-between h-screen p-6">
      <header className="w-full text-center">
        <h1 className="text-3xl font-bold">Workout Session</h1>
      </header>
      
      <main className="flex-1 flex items-center justify-center w-full max-w-md mx-auto">
        <ExerciseScreen
          exerciseName={currentExercise.name}
          timeLeft={timeLeft}
        />
      </main>
      
      <footer className="w-full max-w-md mx-auto flex justify-between items-center gap-4 pb-6">
        <button
          onClick={handlePauseToggle}
          className="btn btn-secondary flex-1"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleFinish}
          className="btn btn-danger flex-1"
        >
          Finish
        </button>
      </footer>
    </div>
  );
}