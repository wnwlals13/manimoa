import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFeed } from '../api';

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
};
