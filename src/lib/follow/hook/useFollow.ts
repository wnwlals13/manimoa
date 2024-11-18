import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userFollow } from '../api';
import { FollowProps } from '../type';
import { FOLLOW_KEY } from '../key';
import { FOLLOW_CNT_KEY } from '@/lib/user/key';

export const useUserFollow = (targetId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Promise<void>, Error, FollowProps>({
    mutationFn: userFollow,
    onMutate: async (newState) => {
      await queryClient.cancelQueries({ queryKey: [FOLLOW_KEY, targetId] });
      const previousState = queryClient.getQueryData([FOLLOW_KEY, targetId]);
      queryClient.setQueryData([FOLLOW_KEY, targetId], !newState.state);
      return { previousState };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [FOLLOW_CNT_KEY] }); // 팔로우한 대상자 팔로우정보
    },
    onError: (err, context) => {
      console.error('팔로우에 실패했습니다.', err);
      if (context.state) {
        queryClient.setQueryData([FOLLOW_KEY, targetId], context.state);
      }
    },
  });
};
