import { IFeedWithLikeData } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeeds } from '../api';

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

export const useFetchFeeds = ({ pageSize }: UseFetchFeedsProps) => {
  return useInfiniteQuery<PaginatedFeedDto, Error>({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 1 }) =>
      fetchFeeds(pageParam as number, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
