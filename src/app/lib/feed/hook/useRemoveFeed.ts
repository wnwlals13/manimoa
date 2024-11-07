import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFeed } from '../api';

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['myfeeds'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });
      queryClient.invalidateQueries({ queryKey: ['month-expense'] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
};
