import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchComments } from '../api';
import { PaginatedCommentDto, UseFetchCommentsProps } from '../type';

export const useFetchComments = ({
  feedId,
  pageSize,
}: UseFetchCommentsProps) => {
  return useInfiniteQuery<PaginatedCommentDto, Error>({
    queryKey: ['comment', feedId],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        return await fetchComments(feedId, pageSize, pageParam as number);
      } catch (err) {
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};
