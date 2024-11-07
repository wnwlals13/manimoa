'use client';

import { useFetchMyFeeds } from '@/app/lib/user/hook/useFetchMyFeeds';
import MyFeedItem from '@/components/feed/my-feed-item';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { FeedData } from '@/types';

export default function Page() {
  const { user } = useAuthStore();
  const { data: feeds, isLoading } = useFetchMyFeeds(user?.uid as string);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <div className="w-full border-t"></div>
      <h1 className="mt-4 mb-1 font-bold ">내글 보기</h1>
      {feeds &&
        feeds.map((item: FeedData, idx: number) => (
          <MyFeedItem key={idx} {...item} />
        ))}
    </div>
  );
}
