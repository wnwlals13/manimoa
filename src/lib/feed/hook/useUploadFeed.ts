import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFeed } from '../api';
import { useRouter } from 'next/navigation';
import { uploadFeedRequestDto } from '../type';
import { useToast } from '@/store/toast/useToast';
import { FEEDS_KEY } from '../key';
import {
  EXPENSES_KEY,
  MONTHLY_EXPENSE_KEY,
  MY_FEEDS_KEY,
} from '@/lib/user/key';

export const useUploadFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<Promise<void>, Error, uploadFeedRequestDto>({
    mutationFn: uploadFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FEEDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [MY_FEEDS_KEY] });
      queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] });
      queryClient.invalidateQueries({ queryKey: [MONTHLY_EXPENSE_KEY] });

      addToast({
        message: '피드가 정상적으로 등록되었습니다.',
        type: 'success',
      });

      router.push('/');
    },
  });
};
