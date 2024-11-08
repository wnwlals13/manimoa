import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { doLike } from '../api';
import { PaginatedFeedDto } from '../../feed/type';
import { likeDto } from '../type';

export function useLike() {
  const queryClient = useQueryClient();
  return useMutation<
    Promise<void>,
    Error,
    likeDto,
    { previousFeeds: InfiniteData<PaginatedFeedDto, unknown> }
  >({
    mutationFn: doLike,
    onMutate: async (value) => {
      // 진행중인 리패치 취소하여 지금 낙관적업데이트를 덮어쓰지 않도록 한다.
      await queryClient.cancelQueries({ queryKey: ['feeds'] });
      // 낙관적 이전의 상태값을 스냅샷찍는다.
      const previousFeeds = queryClient.getQueryData(['feeds']) as InfiniteData<
        PaginatedFeedDto,
        unknown
      >;
      // 낙관적으로 업데이트한다.
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
                      likeCount: item.likeCount + 1,
                      isUserDoLike: 1,
                    }
                  : { ...item },
              ),
            })),
          };
        },
      );
      // context 객체에 이전 스냅샷 값 적용
      return { previousFeeds };
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
    onError: (err, _, context) => {
      console.error('좋아요에 실패했습니다.', err);
      if (context?.previousFeeds) {
        queryClient.setQueryData(['feeds'], context.previousFeeds);
      }
    },
  });
}
