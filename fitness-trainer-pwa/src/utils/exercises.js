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