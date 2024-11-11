import { FiPlus } from 'react-icons/fi';
import InteractiveButton from '@/components/ui/button/interactive-button';
import FeedList from '@/components/feed/feed-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { fetchFeedsAction } from '@/actions/fetch-feeds.action';
import { fetchLikesAction } from '@/actions/fetch-likes.action';

export default async function Home() {
  const cookieStore = cookies().get('user')?.value as string;
  const user = JSON.parse(cookieStore);

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => fetchFeedsAction(pageParam, 10, user.uid),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    pages: 1,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['likes'],
    queryFn: ({ pageParam }) => fetchLikesAction(pageParam, 10, user.uid),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="p-default pt-[60px]">
      <div className="p-3 mb-4 rounded-md border">
        <div className="font-bold mb-1">👏 오늘도 manimoa 봐요!</div>
        <div className="text-gray-600">새로운 소식이 있나요?</div>
      </div>
      <HydrationBoundary state={dehydratedState}>
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
