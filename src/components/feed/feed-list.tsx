'use client';

import { fetchInfiniteQueries } from '@/lib/feed/hook/useFetchFeeds';
import { IFeedWithLikeData } from '@/types';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { FeedItem } from './feed-item';
import FeedListSkeleton from '../ui/skeleton/feed/feed-list-skeleton';
import { fetchFeeds, fetchLikes } from '@/lib/feed/api';
import { useAuthStore } from '@/store/auth/useAuthStore';

const ROWS_PER_PAGE = 10;

export default function FeedList() {
  const { user } = useAuthStore();
  const [feeds, likes] = fetchInfiniteQueries([
    {
      queryKey: ['feeds'],
      queryFn: async ({ pageParam = 1 }) =>
        fetchFeeds(pageParam as number, ROWS_PER_PAGE, user?.uid as string),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    },
    {
      queryKey: ['likes'],
      queryFn: async ({ pageParam = 1 }) =>
        fetchLikes(pageParam as number, ROWS_PER_PAGE, user?.uid as string),
      initialPageParam: 1,
      getNextPageParam: (lastPage: any) => lastPage.nextCursor,
    },
  ]);

  const likesGroup = useMemo(() => {
    return likes ? likes.data?.pages.map((page) => page.likes) : [];
  }, [likes]);

  const feedsGroup = useMemo(() => {
    return feeds ? feeds.data?.pages.map((page) => page.feeds) : [];
  }, [feeds]);

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
  // console.log(feedsGroup, likesGroup);
  return (
    <div>
      {likesGroup &&
        feedsGroup?.map((feeds, i) => (
          <div key={i}>
            {feeds.map((feed: IFeedWithLikeData, idx: any) => (
              <FeedItem key={idx} {...likesGroup[i][idx]} {...feed} />
            ))}
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
