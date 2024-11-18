'use client';

import { fetchInfiniteQueries } from '@/lib/feed/hook/useFetchFeeds';
import { IFeedWithLikeData } from '@/types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FeedItem } from './feed-item';
import FeedListSkeleton from '../ui/skeleton/feed/feed-list-skeleton';
import { fetchFeeds, fetchLikes } from '@/lib/feed/api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { FEEDS_KEY } from '@/lib/feed/key';
import { LIKES_KEY } from '@/lib/like/key';

const ROWS_PER_PAGE = 10;

export default function FeedList() {
  const { user } = useAuthStore();
  const [feeds, likes] = fetchInfiniteQueries([
    {
      queryKey: [FEEDS_KEY],
      queryFn: async ({ pageParam = 1 }) =>
        fetchFeeds(pageParam as number, ROWS_PER_PAGE, user?.uid as string),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    },
    {
      queryKey: [LIKES_KEY],
      queryFn: async ({ pageParam = 1 }) =>
        fetchLikes(pageParam as number, ROWS_PER_PAGE, user?.uid as string),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    },
  ]);

  const likesGroup = likes
    ? likes.data?.pages.flatMap((page) => page.likes)
    : [];

  const feedsGroup = feeds
    ? feeds.data?.pages.flatMap((page) => page.feeds)
    : [];

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });

  useEffect(() => {
    if (inView) {
      likes.fetchNextPage();
      feeds.fetchNextPage();
    }
  }, [inView]);

  if (feeds.isLoading || likes.isLoading) return <FeedListSkeleton count={3} />;

  return (
    <div>
      {feedsGroup &&
        likesGroup &&
        feedsGroup?.map((feed: IFeedWithLikeData, idx: number) => (
          <div key={idx}>
            <FeedItem key={idx} {...likesGroup[idx]} {...feed} />
          </div>
        ))}
      {feeds.isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref} style={{ width: '100%', height: 80 }} />
      )}
    </div>
  );
}
