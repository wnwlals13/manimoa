import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFeed } from '../api';
import { useRouter } from 'next/navigation';
import { uploadFeedRequestDto } from '../type';
import { useToast } from '@/store/toast/useToast';

export const useUploadFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<Promise<void>, Error, uploadFeedRequestDto>({
    mutationFn: uploadFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['myfeeds'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });
      queryClient.invalidateQueries({ queryKey: ['month-expense'] });

      addToast({
        message: '피드가 정상적으로 등록되었습니다.',
        type: 'success',
      });

      router.push('/');
    },
  });
};
