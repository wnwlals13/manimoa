'use client';

import { IFollow } from '@/app/lib/user/api';
import { useFetchProfile } from '@/app/lib/user/hook/useFetchProfile';
import InteractiveButton from '@/components/ui/button/interactive-button';
import { useAuthStore } from '@/store/auth/useAuthStore';
import Image from 'next/image';

export default function Page() {
  const { user } = useAuthStore();
  const { data } = useFetchProfile(user?.uid as string);
  const follwData = data as IFollow;

  return (
    <div className="flex flex-col gap-2 pt-default pb-default">
      <div className="relative flex  justify-between items-center">
        <div className="flex-1 flex gap-10 justify-start items-center">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center ">
              {user && user.profileImg ? (
                <Image
                  width={50}
                  height={50}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${user.profileImg}`}
                  alt=""
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <div className="w-[50px] h-[50px] bg-gray-200 rounded-full"></div>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{user && user.email}</h1>
              <p className="text-sm text-gray-500">{user && user.name}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center gap-5">
            <div className="flex flex-col items-center">
              <p className="font-bold text-sm">
                {follwData && follwData.followCount}
              </p>
              <p>팔로우</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-sm">
                {follwData && follwData.followingCount}
              </p>
              <p>팔로잉</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <InteractiveButton variant="outline" size="full" name="edit_profile">
          프로필 수정
        </InteractiveButton>
        <InteractiveButton variant="outline" size="full" name="logout">
          로그아웃
        </InteractiveButton>
      </div>
    </div>
  );
}
