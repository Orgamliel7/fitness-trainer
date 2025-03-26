import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomExercises } from '@/utils/exercises';

const DEFAULT_EXERCISE_DURATION = 5; // in seconds
const MAX_WORKOUT_HISTORY = 50; // Limit workout history to prevent excessive storage

const useWorkoutStore = create(
  persist(
    (set, get) => ({
      exercises: [],
      currentExerciseIndex: 0,
      isActive: false,
      isPaused: false,
      isWorkoutComplete: false,
      startTime: null,
      pauseStartTime: null,
      totalPausedTime: 0,
      exerciseMinutes: {},
      workoutHistory: [],
      
      // Initialize workout with random exercises
      initWorkout: (exerciseCount = 10) => {
        const randomExercises = getRandomExercises(exerciseCount);
        
        set({
          exercises: randomExercises,
          currentExerciseIndex: 0,
          isActive: false,
          isPaused: false,
          isWorkoutComplete: false,
          startTime: null,
          pauseStartTime: null,
          totalPausedTime: 0,
          exerciseMinutes: {},
        });
      },
      
      // Start the workout
      startWorkout: () => {
        set({
          isActive: true,
          isPaused: false,
          isWorkoutComplete: false,
          startTime: new Date().toISOString(),
        });
      },
      
      // Pause the workout
      pauseWorkout: () => {
        const { isPaused, isActive } = get();
        if (!isPaused && isActive) {
          set({
            isPaused: true,
            pauseStartTime: new Date().toISOString(),
          });
        }
      },
      
      // Resume the workout
      resumeWorkout: () => {
        const { isPaused, pauseStartTime, totalPausedTime } = get();
        if (isPaused) {
          const pauseStart = new Date(pauseStartTime);
          const pauseDuration = (new Date() - pauseStart) / 1000; // in seconds
          
          set({
            isPaused: false,
            totalPausedTime: totalPausedTime + pauseDuration,
            pauseStartTime: null,
          });
        }
      },
      
      // Move to the next exercise
      nextExercise: () => {
        const { currentExerciseIndex, exercises, exerciseMinutes } = get();
        
        if (currentExerciseIndex < exercises.length - 1) {
          // Track time spent on the current exercise
          const currentExercise = exercises[currentExerciseIndex].name;
          const currentExerciseTimeMinutes = DEFAULT_EXERCISE_DURATION / 60; // Convert to minutes
          
          // Update exercise minutes
          const updatedExerciseMinutes = { ...exerciseMinutes };
          updatedExerciseMinutes[currentExercise] = (updatedExerciseMinutes[currentExercise] || 0) + currentExerciseTimeMinutes;
          
          set({
            currentExerciseIndex: currentExerciseIndex + 1,
            exerciseMinutes: updatedExerciseMinutes,
          });
        } else {
          // Finish workout if it's the last exercise
          get().finishWorkout();
        }
      },
      
      // Add workout to history
      addWorkoutToHistory: (workoutStats) => {
        set((state) => {
          const updatedHistory = [
            {
              ...workoutStats,
              id: Date.now(), // Unique identifier
              timestamp: new Date().toISOString()
            },
            ...state.workoutHistory
          ].slice(0, MAX_WORKOUT_HISTORY); // Limit history size
          
          return { workoutHistory: updatedHistory };
        });
      },
      
      // Finish the workout
      finishWorkout: () => {
        console.log('finishWorkout called');
        
        try {
          const { currentExerciseIndex, exercises } = get();
          
          // Forcibly set to last exercise if not already there
          if (currentExerciseIndex < exercises.length - 1) {
            set({ currentExerciseIndex: exercises.length - 1 });
          }
          
          // Get workout stats
          const workoutStats = get().getWorkoutStats();
          
          // Add workout to history
          get().addWorkoutToHistory(workoutStats);
          
          // Update workout state
          set((state) => ({
            isActive: false,
            isPaused: false,
            isWorkoutComplete: true,
            currentExerciseIndex: exercises.length,
          }));
          
          // Try to save to localStorage
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('lastWorkout', JSON.stringify({
                timestamp: new Date().toISOString(),
                ...workoutStats
              }));
              console.log('Workout saved to localStorage');
            } catch (error) {
              console.error('Failed to save workout to localStorage', error);
            }
          }
          
          return true;
        } catch (error) {
          console.error('Error in finishWorkout:', error);
          return false;
        }
      },
      
      // Get current workout stats
      getWorkoutStats: () => {
        const { startTime, totalPausedTime, exerciseMinutes, exercises } = get();
        
        if (!startTime) return { duration: 0, calories: 0, exercises: {} };
        
        const start = new Date(startTime);
        const endTime = new Date();
        const totalTimeSeconds = (endTime - start) / 1000 - totalPausedTime;
        const totalTimeMinutes = totalTimeSeconds / 60;
        
        // Calculate calories based on exercise-specific rates
        const caloriesBurned = Object.entries(exerciseMinutes).reduce((total, [exerciseName, minutes]) => {
          const exercise = exercises.find(ex => ex.name === exerciseName);
          return exercise 
            ? total + (exercise.caloriesPerMinute * minutes)
            : total;
        }, 0);
        
        return {
          duration: Math.round(totalTimeMinutes * 10) / 10, // Round to 1 decimal place
          calories: Math.round(caloriesBurned),
          exercises: exerciseMinutes,
        };
      },
      
      // Get current exercise
      getCurrentExercise: () => {
        const { exercises, currentExerciseIndex } = get();
        return currentExerciseIndex < exercises.length ? exercises[currentExerciseIndex] : null;
      },
      
      // Clear workout history
      clearWorkoutHistory: () => {
        set({ workoutHistory: [] });
      },
    }),
    {
      name: 'fitness-trainer-storage',
      partialize: (state) => ({
        workoutHistory: state.workoutHistory,
      }),
      // Add error handling for storage
      onRehydrateStorage: () => (state) => {
        if (!state) {
          console.warn('Failed to rehydrate workout store');
        }
      }
    }
  )
);

export default useWorkoutStore;