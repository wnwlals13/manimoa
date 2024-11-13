'use client';

import { useFetchMyFeeds } from '@/lib/user/hook/useFetchMyFeeds';
import MyFeedItem from '@/components/feed/my-feed-item';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { FeedData } from '@/types';
import MyFeedsSkeleton from '@/components/ui/skeleton/mypage/my-feeds-skeleton';

export default function Page() {
  const { user } = useAuthStore();
  const { data: feeds, isLoading } = useFetchMyFeeds(user?.uid as string);

  if (isLoading)
    return new Array(3).fill(0).map((_, idx) => <MyFeedsSkeleton key={idx} />);

  return (
    <div className="mb-1 p-default">
      <h1 className="font-bold">내글 보기</h1>
      {feeds &&
        feeds.map((item: FeedData, idx: number) => (
          <MyFeedItem key={idx} {...item} />
        ))}
    </div>
  );
}
