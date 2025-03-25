import { useEffect, useState } from 'react';
import PushUp from '@/assets/exercises/PushUp';
import Jump from '@/assets/exercises/Jump';
import Squat from '@/assets/exercises/Squat';
import { gsap } from 'gsap';

const exerciseComponents = {
  'Push-Up': PushUp,
  'Jump': Jump,
  'Squat': Squat,
};

export default function ExerciseScreen({ exercise, timeLeft }) {
  const [container, setContainer] = useState(null);
  
  useEffect(() => {
    if (!container) return;
    
    // Animation for exercise change
    gsap.fromTo(
      container,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    
    return () => {
      gsap.to(container, { opacity: 0, y: -20, duration: 0.3 });
    };
  }, [exercise?.name, container]);
  
  const ExerciseComponent = exerciseComponents[exercise?.name] || null;
  
  return (
    <div 
      ref={setContainer} 
      className="flex flex-col items-center justify-center p-4 h-full"
    >
      <h2 className="text-2xl font-bold mb-6">{exercise?.name}</h2>
      {ExerciseComponent && <ExerciseComponent />}
      <div className="mt-8 text-xl font-semibold">{timeLeft}s</div>
    </div>
  );
}