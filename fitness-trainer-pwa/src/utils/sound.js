export const playChangeSound = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const audio = new Audio('/sounds/change.mp3'); // Need to add this file
      audio.volume = 0.5;
      audio.play().catch((e) => console.error('Audio play failed:', e));
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  export const playCompleteSound = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const audio = new Audio('/sounds/complete.mp3');  // Need to add this file
      audio.volume = 0.7;
      audio.play().catch((e) => console.error('Audio play failed:', e));
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };