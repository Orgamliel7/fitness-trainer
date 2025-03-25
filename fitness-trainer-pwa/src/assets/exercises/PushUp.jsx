import Image from 'next/image';
import pushUpImage from '@/assets/pictures/push_up.png';

export default function PushUp() {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[300px]">
        <Image
          src={pushUpImage}
          alt="Push Up Exercise"
          className="w-full h-auto max-h-60 object-contain"
          priority // Ensures image loads quickly
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }