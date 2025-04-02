const exercises = [
  {
    id: 1,
    name: 'Push-Up',
    caloriesPerMinute: 8,
  },
  {
    id: 2,
    name: 'Jump',
    caloriesPerMinute: 10,
  },
  {
    id: 3,
    name: 'Squat',
    caloriesPerMinute: 7,
  },
  {
    id: 4,
    name: 'Lunges',
    caloriesPerMinute: 6,
  },
  {
    id: 5,
    name: 'Burpees',
    caloriesPerMinute: 12,
  },
  {
    id: 6,
    name: 'Mountain Climbers',
    caloriesPerMinute: 11,
  },
  {
    id: 7,
    name: 'Plank',
    caloriesPerMinute: 3,
  },
  {
    id: 8,
    name: 'Jumping Jacks',
    caloriesPerMinute: 9,
  },
  {
    id: 9,
    name: 'Leg Raises',
    caloriesPerMinute: 5,
  },
  {
    id: 10,
    name: 'Sit-Ups',
    caloriesPerMinute: 6,
  },
  {
    id: 11,
    name: 'High Knees',
    caloriesPerMinute: 10,
  },
  {
    id: 12,
    name: 'Arm Circles',
    caloriesPerMinute: 3,
  }
];

  
  export function getRandomExercises(count = 10) {
    const selectedExercises = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * exercises.length);
      selectedExercises.push(exercises[randomIndex]);
    }
    
    return selectedExercises;
  }
  
  export function getExerciseByName(name) {
    return exercises.find(exercise => exercise.name === name);
  }
  
  export function getAllExercises() {
    return [...exercises];
  }
  
  export function calculateCaloriesBurned(exerciseMinutes) {
    let totalCalories = 0;
    
    for (const [exerciseName, minutes] of Object.entries(exerciseMinutes)) {
      const exercise = getExerciseByName(exerciseName);
      if (exercise) {
        totalCalories += exercise.caloriesPerMinute * minutes;
      }
    }
    
    return Math.round(totalCalories);
  }