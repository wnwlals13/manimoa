'use client';

import { useFetchMyFeeds } from '@/lib/user/hook/useFetchMyFeeds';
import MyFeedsSkeleton from '../ui/skeleton/mypage/my-feeds-skeleton';
import { FeedData } from '@/types';
import MyFeedItem from '../feed/my-feed-item';

export default function UserFeedsList({ userId }: { userId: string }) {
  const { data: feeds, isLoading } = useFetchMyFeeds(userId);
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
