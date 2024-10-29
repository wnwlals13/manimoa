'use client';

import { Button } from './button';
import { useIsFollow } from '@/app/lib/follow/hook/useIsFollow';
import { useUserFollow } from '@/app/lib/follow/hook/useFollow';
import { useUserUnFollow } from '@/app/lib/follow/hook/useUnFollow';
import Cookies from 'js-cookie';

export function FollowButton({ targetId }: { targetId: string }) {
  const { data, isFetching, isPending, refetch } = useIsFollow(targetId);
  const userFollow = useUserFollow(targetId, refetch);
  const userUnFollow = useUserUnFollow(targetId, refetch);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!data) return;
    if (data.isFriend) {
      // 언팔로우 수행
      userUnFollow.mutate({ targetId });
    } else {
      // 팔로우 수행
      userFollow.mutate({ targetId });
    }
  };
  const userCookie = Cookies.get('user') as string;
  const user = JSON.parse(userCookie);

  if (user.uid === targetId) {
    return <></>;
  } else {
    return (
      <Button
        variant={data && data.isFriend ? 'outline' : 'main'}
        size="full"
        disabled={isFetching || isPending}
        onClick={handleClick}
      >
        {data && data.isFriend ? '팔로잉' : '팔로우'}
      </Button>
    );
  }
}
