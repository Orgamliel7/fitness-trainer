'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ExerciseScreen from '@/components/ExerciseScreen';
import Timer from '@/components/Timer';
import WorkoutHistory from '@/components/WorkoutHistory';
import useWorkoutStore from '@/store/workoutStore';
import { playCompleteSound } from '@/utils/sound';

export default function WorkoutPage() {
  const router = useRouter();

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
    isWorkoutComplete,
    exercises,
    currentExerciseIndex,
  } = useWorkoutStore();

  // Exercise duration (5 seconds per exercise)
  const EXERCISE_DURATION = 5;

  // Initialize workout on component mount
  useEffect(() => {
    initWorkout(10); // 10 random exercises
    startWorkout();
  }, []);

  // Handle timer completion (move to next exercise)
  const handleTimerComplete = () => {
    console.log('Timer completed, moving to next exercise');
    
    // If not the last exercise, move to next
    if (currentExerciseIndex < exercises.length - 1) {
      nextExercise();
    } else {
      // Last exercise completed
      finishWorkout();
      router.push('/results');
    }
  };

  // Handle workout completion
  useEffect(() => {
    if (isWorkoutComplete) {
      playCompleteSound();
      
      // Save workout stats
      const stats = getWorkoutStats();
      try {
        localStorage.setItem('lastWorkout', JSON.stringify({
          timestamp: new Date().toISOString(),
          ...stats
        }));
      } catch (error) {
        console.error('Failed to save workout', error);
      }

      router.push('/results');
    }
  }, [isWorkoutComplete, router]);

  // Pause/Resume handler
  const handlePauseToggle = () => {
    if (isPaused) {
      resumeWorkout();
    } else {
      pauseWorkout();
    }
  };

  // Finish workout handler
  const handleFinish = () => {
    finishWorkout();
    router.push('/results');
  };

  // Get current exercise
  const currentExercise = getCurrentExercise();

  // If no current exercise, show loading
  if (!currentExercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </h1>
          <WorkoutHistory />
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          <ExerciseScreen 
            exercise={currentExercise} 
            timeLeft={
              <Timer 
                duration={EXERCISE_DURATION}
                isActive={isActive}
                isPaused={isPaused}
                onComplete={handleTimerComplete}
              />
            }
          />
        </div>
        
        <div className="flex justify-between space-x-4 mt-4">
          <button 
            onClick={handlePauseToggle}
            className="flex-1 bg-yellow-600 text-white py-3 rounded-xl 
            hover:bg-yellow-700 transition duration-300 
            shadow-lg hover:shadow-xl transform hover:-translate-y-1 
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          
          <button 
            onClick={handleFinish}
            className="flex-1 bg-red-600 text-white py-3 rounded-xl 
            hover:bg-red-700 transition duration-300 
            shadow-lg hover:shadow-xl transform hover:-translate-y-1 
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}