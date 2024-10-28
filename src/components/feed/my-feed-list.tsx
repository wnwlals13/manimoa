'use client';

import { FeedData } from '@/types';
import MyFeedItem from './my-feed-item';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useEffect } from 'react';
import { useFetchMyFeeds } from '@/app/lib/feed/hook/useFetchMyFeeds';

export function MyFeedsList() {
  const { user, userFeeds, setUserFeeds } = useAuthStore();
  //   if (!userFeeds) {
  // const { data, isSuccess, isPending, isError, error } = useFetchMyFeeds();

  //   useEffect(() => {
  //     if (!user) return;
  //     // api 호출
  //     // if (userFeeds.length < 1) fetchFeeds(user?.uid);
  //   }, [user]);

  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log('myfeedList');
  //     setUserFeeds(data);
  //   }
  // }, [isSuccess]);
  return (
    <div>
      {/* {data.map((item: FeedData, idx: number) => (
        <MyFeedItem key={idx} {...item} />
      ))} */}
    </div>
  );
}
