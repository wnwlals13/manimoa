'use client';

import Profile from '../ui/profile';
import { FollowButton } from '../ui/button/follow-button';
import { MessageButton } from '../ui/button/message-button';
import InteractiveButton from '../ui/button/interactive-button';
import { useFetchProfile } from '@/lib/user/hook/useFetchProfile';
import { useFetchFollowCnt } from '@/lib/user/hook/useFetchFollowCnt';
import { useAuthStore } from '@/store/auth/useAuthStore';
import MyProfileSkeleton from '../ui/skeleton/mypage/my-profile-skeleton';

export default function UserProfileInfo({ userId }: { userId: string }) {
  const { user: loginUser } = useAuthStore();
  const { data: user, isLoading: isProfileLoading } = useFetchProfile(userId);
  const { data: followCnt, isLoading: isCntLoading } =
    useFetchFollowCnt(userId);

  if (isProfileLoading || isCntLoading) return <MyProfileSkeleton />;

  return (
    <div className="flex flex-col gap-2 pl-default pr-default pb-default ">
      <div className="relative flex  justify-between items-center">
        <div className="flex-1 flex gap-10 justify-start items-center">
          <div className="flex gap-5 items-center">
            <Profile src={user?.profileImg as string} size="lg" />
            <div className="flex flex-col">
              <h1 className="font-semibold text-lg">{user?.email}</h1>
              <p className="text-sm text-gray-500">{user?.name}</p>
            </div>
          </div>
          <div className="flex-1 flex justify-center gap-5">
            <div className="flex flex-col items-center">
              <p className="font-bold text-sm">{followCnt?.followCount}</p>
              <p>팔로우</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-sm">{followCnt?.followingCount}</p>
              <p>팔로잉</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        {loginUser?.uid == userId ? (
          <>
            <InteractiveButton
              variant="outline"
              size="full"
              name="edit_profile"
            >
              프로필 수정
            </InteractiveButton>
            <InteractiveButton variant="outline" size="full" name="logout">
              로그아웃
            </InteractiveButton>
          </>
        ) : (
          <>
            <FollowButton targetId={user.uid} />
            <MessageButton
              targetId={user.uid}
              loginId={userId}
              isChatExist={user.isChatExist}
              roomId={user.chatRoomId}
              email={user.email}
            >
              메세지
            </MessageButton>
          </>
        )}
      </div>
    </div>
  );
}
