import { IFeedWithLikeData } from '@/types';
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { fetchFeeds } from '../api';
import { fetchFeedsAction } from '@/actions/fetch-feeds.action';

interface UseFetchFeedsProps {
  pageSize: number;
}

interface PaginatedFeedDto {
  feeds: IFeedWithLikeData[];
  hasNextPage: boolean;
  totalCount: number;
  nextCursor?: number;
  currentPage: number;
}

export const usePrefetchFeeds = async (userId: string) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => fetchFeedsAction(pageParam, 20, userId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    pages: 1,
  });
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};

export const useFetchFeeds = ({ pageSize }: UseFetchFeedsProps) => {
  return useInfiniteQuery<PaginatedFeedDto, Error>({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 1 }) =>
      fetchFeeds(pageParam as number, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
