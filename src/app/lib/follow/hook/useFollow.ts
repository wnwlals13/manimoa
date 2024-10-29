import {
  QueryClient,
  QueryObserverResult,
  useMutation,
} from '@tanstack/react-query';
import { userFollow } from '../api';

export interface FollowProps {
  targetId: string;
}

export const useUserFollow = (
  targetId: string,
  refetch: () => Promise<QueryObserverResult>,
) => {
  const queryClient = new QueryClient();
  return useMutation<FollowProps, Error, FollowProps>({
    mutationFn: userFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', targetId] });
      refetch();
    },
  });
};
