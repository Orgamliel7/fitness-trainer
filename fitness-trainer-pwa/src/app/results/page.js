'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useWorkoutStore from '@/store/workoutStore';

export default function ResultsPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ duration: 0, calories: 0 });
  const { getWorkoutStats, initWorkout } = useWorkoutStore();
  
  useEffect(() => {
    // Get stats from store or localStorage
    try {
      const lastWorkout = JSON.parse(localStorage.getItem('lastWorkout'));
      if (lastWorkout) {
        setStats({
          duration: lastWorkout.duration,
          calories: lastWorkout.calories
        });
      } else {
        setStats(getWorkoutStats());
      }
    } catch (error) {
      console.error('Error retrieving workout stats:', error);
      setStats(getWorkoutStats());
    }
  }, [getWorkoutStats]);
  
  const handleNewWorkout = () => {
    initWorkout(10);
    router.push('/');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-8">Workout Complete!</h1>
      
      <div className="bg-gray-900 rounded-lg p-8 mb-10 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <p className="text-lg text-gray-400">Duration</p>
            <p className="text-3xl font-bold">{stats.duration} min</p>
          </div>
          
          <div className="text-center flex-1">
            <p className="text-lg text-gray-400">Calories</p>
            <p className="text-3xl font-bold">{stats.calories}</p>
          </div>
        </div>
        
        <p className="text-gray-400 mb-2">Great job completing your workout!</p>
      </div>
      
      <button 
        onClick={handleNewWorkout}
        className="btn btn-primary text-xl"
      >
        New Workout
      </button>
    </div>
  );
}