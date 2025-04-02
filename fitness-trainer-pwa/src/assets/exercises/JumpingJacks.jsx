import Image from 'next/image';
import jumpingJacksImage from '@/assets/pictures/jumpingjacks.png';

export default function JumpingJacks() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[300px]">
      <Image
        src={jumpingJacksImage}
        alt="Jumping Jacks Exercise"
        className="w-full h-auto max-h-60 object-contain"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
