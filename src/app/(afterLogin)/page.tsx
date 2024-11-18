import { FiPlus } from 'react-icons/fi';
import InteractiveButton from '@/components/ui/button/interactive-button';
import FeedList from '@/components/feed/feed-list';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchFeedsAction } from '@/actions/fetch-feeds.action';
import { fetchLikesAction } from '@/actions/fetch-likes.action';
import { getDehydratedQueries } from '@/util/react-query';
import { FEEDS_KEY } from '@/lib/feed/key';
import { LIKES_KEY } from '@/lib/like/key';

export default async function Home() {
  const queries = await getDehydratedQueries([
    { queryKey: [FEEDS_KEY], queryFn: fetchFeedsAction },
    { queryKey: [LIKES_KEY], queryFn: fetchLikesAction },
  ]);

  return (
    <div className="p-default pt-[60px]">
      <div className="p-3 mb-4 rounded-md border">
        <div className="font-bold mb-1">👏 오늘도 manimoa 봐요!</div>
        <div className="text-gray-600">새로운 소식이 있나요?</div>
      </div>
      <HydrationBoundary state={{ queries: [...queries] }}>
        <FeedList />
      </HydrationBoundary>
      <InteractiveButton
        variant="default"
        className="fixed custom:right-[calc((100vw-570px)/2)] right-5 bottom-20 rounded-full flex justify-center items-center h-[50px] w-[50px] shadow-lg z-10"
        name="add_feed"
      >
        <FiPlus color="white" size="25" />
      </InteractiveButton>
    </div>
  );
}
