import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { doLike } from '../api';
import { PaginatedLikeDto } from '../../feed/type';
import { likeDto } from '../type';
import { LIKES_KEY } from '../key';

export function useLike() {
  const queryClient = useQueryClient();
  return useMutation<
    Promise<void>,
    Error,
    likeDto,
    { previousFeeds: InfiniteData<PaginatedLikeDto, unknown> }
  >({
    mutationFn: doLike,
    onMutate: async (value) => {
      // 진행중인 리패치 취소하여 지금 낙관적업데이트를 덮어쓰지 않도록 한다.
      await queryClient.cancelQueries({ queryKey: [LIKES_KEY] });
      // 낙관적 이전의 상태값을 스냅샷찍는다.
      const previousFeeds = queryClient.getQueryData([
        LIKES_KEY,
      ]) as InfiniteData<PaginatedLikeDto, unknown>;
      // 낙관적으로 업데이트한다.
      queryClient.setQueryData(
        [LIKES_KEY],
        (old: InfiniteData<PaginatedLikeDto, unknown>) => {
          return {
            ...old,
            pages: old.pages.map((page: PaginatedLikeDto) => ({
              ...page,
              likes: page.likes.map((item) =>
                item.feedId === value.feedId
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
      return queryClient.invalidateQueries({ queryKey: [LIKES_KEY] });
    },
    onError: (err, _, context) => {
      console.error('좋아요에 실패했습니다.', err);
      if (context?.previousFeeds) {
        queryClient.setQueryData([LIKES_KEY], context.previousFeeds);
      }
    },
  });
}
