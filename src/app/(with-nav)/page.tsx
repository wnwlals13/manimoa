'use client';

import { FiPlus } from 'react-icons/fi';
import InteractiveButton from '@/components/ui/interactiveButton';
import FeedList from '@/components/feed/feed-list';
// import { HydrationBoundary } from '@tanstack/react-query';
// import { usePrefetchFeeds } from '../lib/feed/hook/useFetchFeeds';
// import { cookies } from 'next/headers';

export default function Home() {
  // const cookieStore = cookies().get('user')?.value as string;
  // const user = JSON.parse(cookieStore);
  // const dehydratedState = usePrefetchFeeds(user.uid);
  // console.log('dehydreatedState =>', dehydratedState);
  return (
    <>
      <div className="p-3 mb-4 mt-4 rounded-md border">
        <div className="font-bold mb-1">👏 오늘도 manimoa 봐요!</div>
        <div className="text-gray-600">새로운 소식이 있나요?</div>
      </div>
      {/* <HydrationBoundary state={dehydratedState}> */}
      <FeedList />
      {/* </HydrationBoundary> */}
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
