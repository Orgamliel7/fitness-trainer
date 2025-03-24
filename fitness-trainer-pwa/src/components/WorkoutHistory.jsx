import { useState, useEffect } from 'react';
import useWorkoutStore from '@/store/workoutStore';

export default function WorkoutHistory() {
  const { workoutHistory, clearWorkoutHistory } = useWorkoutStore();
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    setHistory(workoutHistory || []);
  }, [workoutHistory]);
  
  if (!history.length) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400">No workout history yet</p>
      </div>
    );
  }
  
  // Sort history by most recent first
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Workout History</h2>
        <button 
          onClick={clearWorkoutHistory}
          className="text-red-500 text-sm"
        >
          Clear History
        </button>
      </div>
      
      <div className="space-y-4">
        {sortedHistory.map((workout) => {
          const date = new Date(workout.timestamp);
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return (
            <div key={workout.id} className="bg-gray-900 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-400">
                  {formattedDate} at {formattedTime}
                </div>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <span className="text-gray-400 text-sm">Duration: </span>
                  <span className="font-medium">{workout.duration} min</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Calories: </span>
                  <span className="font-medium">{workout.calories}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}