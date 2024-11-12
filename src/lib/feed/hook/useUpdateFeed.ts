import { updateFeed } from './../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updateFeedRequestDto } from '../type';
import { useToast } from '@/store/toast/useToast';

export const useUpdateFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<Promise<void>, Error, updateFeedRequestDto>({
    mutationFn: updateFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['myfeeds'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });
      queryClient.invalidateQueries({ queryKey: ['month-expense'] });

      addToast({
        message: '피드가 정상적으로 수정되었습니다.',
        type: 'success',
      });

      router.push('/');
    },
  });
};
