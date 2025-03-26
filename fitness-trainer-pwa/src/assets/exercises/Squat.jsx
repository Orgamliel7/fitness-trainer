import Image from 'next/image';
import squatImage from '@/assets/pictures/squat.png';

export default function Squat() {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[300px]">
        <Image
          src={squatImage}
          alt="Squat Exercise"
          className="w-full h-auto max-h-60 object-contain"
          priority // Ensures image loads quickly
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }