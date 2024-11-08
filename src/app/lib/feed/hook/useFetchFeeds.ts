import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFeeds } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { PaginatedFeedDto, UseFetchFeedsProps } from '../type';

export const useFetchFeeds = ({ pageSize }: UseFetchFeedsProps) => {
  const { user } = useAuthStore();

  return useInfiniteQuery<PaginatedFeedDto, Error>({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 1 }) =>
      fetchFeeds(pageParam as number, pageSize, user?.uid as string),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
