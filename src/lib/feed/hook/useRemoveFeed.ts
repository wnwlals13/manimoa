import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFeed } from '../api';
import { useToast } from '@/store/toast/useToast';
import { FEEDS_KEY } from '../key';
import {
  EXPENSES_KEY,
  MONTHLY_EXPENSE_KEY,
  MY_FEEDS_KEY,
} from '@/lib/user/key';

export const useDeleteFeed = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: removeFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEEDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [MY_FEEDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [MONTHLY_EXPENSE_KEY] });

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
