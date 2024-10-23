import { FeedItem } from '@/components/feed/feed-item';
import { FiPlus } from 'react-icons/fi';
import mock from '@/mock/feed.json';
import { FeedData } from '@/types';
import { Suspense } from 'react';
import InteractiveButton from '@/components/ui/interactiveButton';

async function AllFeeds() {
  return (
    <div>
      {mock.map((item: FeedData) => (
        <FeedItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <div className="p-3 mb-4 mt-4 rounded-md border">
        <div className="font-bold mb-1">👏 오늘도 manimoa 봐요!</div>
        <div className="text-gray-600">새로운 소식이 있나요?</div>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <AllFeeds />
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
