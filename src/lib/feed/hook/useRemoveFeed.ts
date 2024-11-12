import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFeed } from '../api';
import { useToast } from '@/store/toast/useToast';

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: removeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['myfeeds'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });
      queryClient.invalidateQueries({ queryKey: ['month-expense'] });

      addToast({
        message: '피드가 정상적으로 삭제되었습니다.',
        type: 'success',
      });
    },
    onError: (err: Error) => {
      console.error(err);
    },
  });
};
