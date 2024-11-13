'use client';

import { IFollow } from '@/lib/user/api';
import { useFetchProfile } from '@/lib/user/hook/useFetchProfile';
import InteractiveButton from '@/components/ui/button/interactive-button';
import Profile from '@/components/ui/profile';
import { useAuthStore } from '@/store/auth/useAuthStore';
import MyProfileSkeleton from '@/components/ui/skeleton/mypage/my-profile-skeleton';

export default function Page() {
  const { user } = useAuthStore();
  const { data, isPending } = useFetchProfile(user?.uid as string);

  if (isPending) return <MyProfileSkeleton />;
  const follwData = data as IFollow;

  return (
    <div className="flex flex-col gap-2 p-default">
      <div className="relative flex  justify-between items-center">
        <div className="flex-1 flex gap-10 justify-start items-center">
          <div className="flex gap-5 items-center">
            <Profile src={user?.profileImg as string} size="lg" />
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
