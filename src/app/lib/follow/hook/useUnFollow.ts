import {
  QueryClient,
  QueryObserverResult,
  useMutation,
} from '@tanstack/react-query';
import { userUnFollow } from '../api';
import { FollowProps } from './useFollow';

export const useUserUnFollow = (
  targetId: string,
  refetch: () => Promise<QueryObserverResult>,
) => {
  const queryClient = new QueryClient();
  return useMutation<FollowProps, Error, FollowProps>({
    mutationFn: userUnFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', targetId] });
      refetch();
    },
  });
};
