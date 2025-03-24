'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useWorkoutStore from '@/store/workoutStore';
import WorkoutHistory from '@/components/WorkoutHistory';

export default function HomePage() {
  const router = useRouter();
  const { initWorkout } = useWorkoutStore();
  
  useEffect(() => {
    // Initialize a new workout when landing on the home page
    initWorkout(10);
  }, [initWorkout]);
  
  const startWorkout = () => {
    router.push('/workout');
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Fitness Trainer</h1>
      
      <div className="text-center mb-10 max-w-md">
        <p className="text-lg mb-8">
          Ready for a random workout? You'll go through a series of exercises,
          each lasting 5 seconds. Let's get moving!
        </p>
        
        <button 
          onClick={startWorkout}
          className="btn btn-primary text-xl"
        >
          Start Workout
        </button>
        
        <div className="mt-8 text-gray-400">
          <p>Includes: Push-Ups, Jumps, Squats</p>
          <p className="mt-2">Each exercise lasts 5 seconds</p>
        </div>
      </div>
      
      <div className="w-full max-w-md mt-8">
        <WorkoutHistory />
      </div>
    </div>
  );
}