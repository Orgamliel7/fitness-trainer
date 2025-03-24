// src/store/workoutStore.js
import { create } from 'zustand';
import { getRandomExercises } from '@/utils/exercises';

const DEFAULT_EXERCISE_DURATION = 5; // in seconds

const useWorkoutStore = create((set, get) => ({
  exercises: [],
  currentExerciseIndex: 0,
  isActive: false,
  isPaused: false,
  startTime: null,
  pauseStartTime: null,
  totalPausedTime: 0,
  exerciseMinutes: {},
  
  // Initialize workout with random exercises
  initWorkout: (exerciseCount = 10) => {
    const randomExercises = getRandomExercises(exerciseCount);
    
    set({
      exercises: randomExercises,
      currentExerciseIndex: 0,
      isActive: false,
      isPaused: false,
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
      startTime: new Date(),
    });
  },
  
  // Pause the workout
  pauseWorkout: () => {
    if (!get().isPaused && get().isActive) {
      set({
        isPaused: true,
        pauseStartTime: new Date(),
      });
    }
  },
  
  // Resume the workout
  resumeWorkout: () => {
    if (get().isPaused) {
      const pauseDuration = (new Date() - get().pauseStartTime) / 1000; // in seconds
      
      set({
        isPaused: false,
        totalPausedTime: get().totalPausedTime + pauseDuration,
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
  
  // Finish the workout
  finishWorkout: () => {
    // Update time for the final exercise
    const { currentExerciseIndex, exercises, exerciseMinutes } = get();
    const currentExercise = exercises[currentExerciseIndex].name;
    const currentExerciseTimeMinutes = DEFAULT_EXERCISE_DURATION / 60; // Convert to minutes
    
    // Update exercise minutes
    const updatedExerciseMinutes = { ...exerciseMinutes };
    updatedExerciseMinutes[currentExercise] = (updatedExerciseMinutes[currentExercise] || 0) + currentExerciseTimeMinutes;
    
    set({
      isActive: false,
      isPaused: false,
      exerciseMinutes: updatedExerciseMinutes,
    });
  },
  
  // Get current workout stats
  getWorkoutStats: () => {
    const { startTime, totalPausedTime, exerciseMinutes } = get();
    
    if (!startTime) return { duration: 0, calories: 0 };
    
    const endTime = new Date();
    const totalTimeSeconds = (endTime - startTime) / 1000 - totalPausedTime;
    const totalTimeMinutes = totalTimeSeconds / 60;
    
    // Calculate calories based on exercise-specific rates
    const caloriesBurned = Object.entries(exerciseMinutes).reduce((total, [exerciseName, minutes]) => {
      const exercise = get().exercises.find(ex => ex.name === exerciseName);
      if (exercise) {
        return total + (exercise.caloriesPerMinute * minutes);
      }
      return total;
    }, 0);
    
    return {
      duration: Math.round(totalTimeMinutes * 10) / 10, // Round to 1 decimal place
      calories: Math.round(caloriesBurned),
    };
  },
  
  // Get current exercise
  getCurrentExercise: () => {
    const { exercises, currentExerciseIndex } = get();
    return exercises[currentExerciseIndex] || null;
  },
}));

export default useWorkoutStore;