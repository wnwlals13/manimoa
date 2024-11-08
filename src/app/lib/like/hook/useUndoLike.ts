import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { undoLike } from '../api';
import { PaginatedFeedDto } from '../../feed/type';
import { likeDto } from '../type';

export function useUnLike() {
  const queryClient = useQueryClient();
  return useMutation<
    Promise<void>,
    Error,
    likeDto,
    { previousFeeds: InfiniteData<PaginatedFeedDto, unknown> }
  >({
    mutationFn: undoLike,
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey: ['feeds'] });
      const previousFeeds = queryClient.getQueryData(['feeds']) as InfiniteData<
        PaginatedFeedDto,
        unknown
      >;

      queryClient.setQueryData(
        ['feeds'],
        (old: InfiniteData<PaginatedFeedDto, unknown>) => {
          return {
            ...old,
            pages: old.pages.map((page: PaginatedFeedDto) => ({
              ...page,
              feeds: page.feeds.map((item) =>
                item.id === value.feedId
                  ? {
                      ...item,
                      likeCount: item.likeCount - 1,
                      isUserDoLike: 0,
                    }
                  : { ...item },
              ),
            })),
          };
        },
      );

      return { previousFeeds };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
    onError: (err, _, context) => {
      console.error('좋아요 해제에 실패했습니다.', err);
      if (context?.previousFeeds) {
        queryClient.setQueryData(['feeds'], context.previousFeeds);
      }
    },
  });
}
