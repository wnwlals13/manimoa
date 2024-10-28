'use client';

import { FeedItem } from '@/components/feed/feed-item';
import { FiPlus } from 'react-icons/fi';
import { FeedData } from '@/types';
import { Suspense, useEffect } from 'react';
import InteractiveButton from '@/components/ui/interactiveButton';
import { useFetchFeeds } from '../lib/feed/hook/useFetchFeeds';
import { useInView } from 'react-intersection-observer';

const ROWS_PER_PAGE = 20;

export default function Home() {
  const { data, fetchNextPage, isFetchingNextPage } = useFetchFeeds({
    pageSize: ROWS_PER_PAGE,
  });
  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });

  const feedsGroup = data ? data.pages.map((page) => page.feeds) : [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="p-3 mb-4 mt-4 rounded-md border">
        <div className="font-bold mb-1">👏 오늘도 manimoa 봐요!</div>
        <div className="text-gray-600">새로운 소식이 있나요?</div>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <div>
          {feedsGroup.map((feeds, i) => (
            <div key={i}>
              {feeds.map((feed: FeedData, idx) => (
                <FeedItem key={idx} {...feed} />
              ))}
            </div>
          ))}
          {isFetchingNextPage ? (
            <div>Loading...</div>
          ) : (
            <div ref={ref} style={{ width: '100%', height: 80 }} />
          )}
        </div>
      </Suspense>
      <InteractiveButton
        variant="default"
        className="fixed custom:right-[calc((100vw-570px)/2)] right-5 bottom-20 rounded-full flex justify-center items-center h-[50px] w-[50px] shadow-lg z-10"
        name="add_feed"
      >
        <FiPlus color="white" size="25" />
      </InteractiveButton>
    </>
  );
}
