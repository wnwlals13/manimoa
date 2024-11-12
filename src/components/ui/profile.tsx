import { cn } from '@/util/utils';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import profileImg from '@/assets/profile.png';

type ProfileSizeType = 'sm' | 'md' | 'lg' | 'xlg';

interface IProfileProps {
  src: string;
  size: ProfileSizeType;
}

const ProfileVariants = cva(`rounded-full overflow-hidden relative`, {
  variants: {
    size: {
      sm: 'w-[25px] h-[25px]',
      md: 'w-[50px] h-[50px]',
      lg: 'w-[75px] h-[75px]',
      xlg: 'w-[100px] h-[100px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function Profile({ src, size }: IProfileProps) {
  return (
    <div className={cn(ProfileVariants({ size }))}>
      {src ? (
        <Image
          fill
          sizes="(max-width:768px) 40px"
          style={{ objectFit: 'cover' }}
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${src}`}
          alt="프로필 이미지입니다."
        ></Image>
      ) : (
        <Image
          fill
          sizes="(max-width:768px) 40px"
          style={{ objectFit: 'cover' }}
          alt="프로필 이미지입니다."
          src={profileImg}
        />
      )}
    </div>
  );
}
