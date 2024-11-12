'use client';

import { Button } from './button';
import { useIsFollow } from '@/lib/follow/hook/useIsFollow';
import { useUserFollow } from '@/lib/follow/hook/useFollow';
import { useUserUnFollow } from '@/lib/follow/hook/useUnFollow';
import { useAuthStore } from '@/store/auth/useAuthStore';

export function FollowButton({ targetId }: { targetId: string }) {
  const { user } = useAuthStore();
  const { data: isFriend } = useIsFollow(targetId);
  const { mutate: followMutate, isPending: followPending } = useUserFollow(
    targetId,
    user?.uid as string,
  );
  const { mutate: unfollowMutate, isPending: unfollowPending } =
    useUserUnFollow(targetId, user?.uid as string);

  const handleUnFollow = () =>
    unfollowMutate({ targetId, userId: user?.uid as string, state: !isFriend });
  const handleFollow = () =>
    followMutate({ targetId, userId: user?.uid as string, state: isFriend });

  if (user?.uid === targetId) {
    return <></>;
  } else {
    return (
      <Button
        variant={isFriend ? 'outline' : 'main'}
        size="full"
        disabled={followPending || unfollowPending}
        onClick={isFriend ? handleUnFollow : handleFollow}
      >
        {isFriend ? '팔로잉' : '팔로우'}
      </Button>
    );
  }
}
