import Image from 'next/image';
import lungesImage from '@/assets/pictures/lunges.png';

export default function Lunges() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[300px]">
      <Image
        src={lungesImage}
        alt="Lunges Exercise"
        className="w-full h-auto max-h-60 object-contain"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
