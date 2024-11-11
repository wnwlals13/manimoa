import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { undoLike } from '../api';
import { PaginatedLikeDto } from '../../feed/type';
import { likeDto } from '../type';

export function useUnLike() {
  const queryClient = useQueryClient();
  return useMutation<
    Promise<void>,
    Error,
    likeDto,
    { previousFeeds: InfiniteData<PaginatedLikeDto, unknown> }
  >({
    mutationFn: undoLike,
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey: ['likes'] });
      const previousFeeds = queryClient.getQueryData(['likes']) as InfiniteData<
        PaginatedLikeDto,
        unknown
      >;

      queryClient.setQueryData(
        ['likes'],
        (old: InfiniteData<PaginatedLikeDto, unknown>) => {
          return {
            ...old,
            pages: old.pages.map((page: PaginatedLikeDto) => ({
              ...page,
              likes: page.likes.map((item) =>
                item.feedId === value.feedId
                  ? {
                      ...item,
                      likeCount: item.likeCount - 1,
                      isUserDoLike: 1,
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
      queryClient.invalidateQueries({ queryKey: ['likes'] });
    },
    onError: (err, _, context) => {
      console.error('좋아요 해제에 실패했습니다.', err);
      if (context?.previousFeeds) {
        queryClient.setQueryData(['likes'], context.previousFeeds);
      }
    },
  });
}
