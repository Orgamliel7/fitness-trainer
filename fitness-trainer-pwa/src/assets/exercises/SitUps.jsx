import Image from 'next/image';
import sitUpsImage from '@/assets/pictures/situps.png';

export default function SitUps() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[300px]">
      <Image
        src={sitUpsImage}
        alt="Sit-Ups Exercise"
        className="w-full h-auto max-h-60 object-contain"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
