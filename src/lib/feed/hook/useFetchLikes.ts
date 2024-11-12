import { useAuthStore } from '@/store/auth/useAuthStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedLikeDto } from '../type';
import { fetchLikes } from '../api';

export const useFetchLikes = (pageSize: number) => {
  const { user } = useAuthStore();

  return useInfiniteQuery<PaginatedLikeDto, Error>({
    queryKey: ['likes'],
    queryFn: async ({ pageParam = 1 }) =>
      fetchLikes(pageParam as number, pageSize, user?.uid as string),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
