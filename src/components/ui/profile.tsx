import Image from 'next/image';

export default function Profile({ profileImg }: { profileImg?: string }) {
  return (
    <div className="w-[40px] h-[40px] bg-gray-200 rounded-full leading-9 overflow-hidden">
      {profileImg && (
        <Image
          width={40}
          height={40}
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${profileImg}`}
          alt="프로필 이미지입니다."
          style={{ height: '100%' }}
        ></Image>
      )}
    </div>
  );
}
