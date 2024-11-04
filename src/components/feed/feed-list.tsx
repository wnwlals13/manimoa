'use client';

import { useFetchFeeds } from '@/app/lib/feed/hook/useFetchFeeds';
import { IFeedWithLikeData } from '@/types';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FeedItem } from './feed-item';
import FeedListSkeleton from '../ui/skeleton/feed-list-skeleton';

const ROWS_PER_PAGE = 20;

export default function FeedList() {
  const { data, fetchNextPage, isFetchingNextPage, refetch, isLoading } =
    useFetchFeeds({
      pageSize: ROWS_PER_PAGE,
    });
  const feedsGroup = data ? data.pages.map((page) => page.feeds) : [];

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <FeedListSkeleton count={3} />;

  return (
    <div>
      {feedsGroup.map((feeds, i) => (
        <div key={i}>
          {feeds.map((feed: IFeedWithLikeData, idx) => (
            <FeedItem key={idx} refetch={refetch} {...feed} />
          ))}
        </div>
      ))}
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref} style={{ width: '100%', height: 80 }} />
      )}
    </div>
  );
}
