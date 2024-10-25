import { FeedData } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseFetchFeedsProps {
  pageSize?: number;
}

interface PaginatedFeedDto {
  feeds: FeedData[];
  hasNextPage: boolean;
  totalCount: number;

  nextCursor?: number;
}

export const useFetchFeeds = ({ pageSize }: UseFetchFeedsProps) => {
  return useInfiniteQuery<PaginatedFeedDto, Error>({
    queryKey: ['feeds'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readAll?cursor=` +
            pageParam +
            `&pageSize=` +
            pageSize,
          { cache: 'no-store' },
        ).then((res) => res.json());

        return response;
      } catch (err) {
        console.error('게시글 fetch 실패', err);
        throw new Error();
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  // return <></>;
};
