'use client';

import { useFetchFeeds } from '@/lib/feed/hook/useFetchFeeds';
import { IFeedWithLikeData } from '@/types';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { FeedItem } from './feed-item';
import FeedListSkeleton from '../ui/skeleton/feed-list-skeleton';
import { useFetchLikes } from '@/lib/feed/hook/useFetchLikes';

const ROWS_PER_PAGE = 20;

export default function FeedList() {
  const {
    data,
    fetchNextPage: fetchFeedNext,
    isFetchingNextPage,
    isLoading,
  } = useFetchFeeds({
    pageSize: ROWS_PER_PAGE,
  });

  const { data: likes, fetchNextPage: fetchLikeNext } =
    useFetchLikes(ROWS_PER_PAGE);

  const likesGroup = useMemo(() => {
    return likes ? likes.pages.map((page) => page.likes) : [];
  }, [likes]);

  const feedsGroup = useMemo(() => {
    return data ? data.pages.map((page) => page.feeds) : [];
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });

  useEffect(() => {
    if (inView) {
      fetchFeedNext();
      fetchLikeNext();
    }
  }, [inView]);

  if (isLoading) return <FeedListSkeleton count={3} />;

  return (
    <div>
      {feedsGroup.map((feeds, i) => (
        <div key={i}>
          {feeds.map((feed: IFeedWithLikeData, idx) => (
            <FeedItem key={idx} {...likesGroup[i][idx]} {...feed} />
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
