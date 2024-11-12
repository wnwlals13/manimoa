import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userFollow } from '../api';
import { FollowProps } from '../type';

export const useUserFollow = (targetId: string, userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Promise<void>, Error, FollowProps>({
    mutationFn: userFollow,
    onMutate: async (newState) => {
      await queryClient.cancelQueries({ queryKey: ['follow', targetId] });
      const previousState = queryClient.getQueryData(['follow', targetId]);
      queryClient.setQueryData(['follow', targetId], !newState.state);
      return { previousState };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', targetId] });
    },
    onError: (err, context) => {
      console.error('팔로우에 실패했습니다.', err);
      if (context.state) {
        queryClient.setQueryData(['follow', targetId], context.state);
      }
    },
  });
};
