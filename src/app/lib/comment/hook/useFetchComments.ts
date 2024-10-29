import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchComments } from '../api';
import { CommentData } from '@/types';

interface UseFetchCommentsProps {
  feedId: string;
  pageSize: number;
}

export interface PaginatedCommentDto {
  comments: CommentData[];
  hasNextPage: boolean;
  totalCount: number;
  nextCursor?: number;
}

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
