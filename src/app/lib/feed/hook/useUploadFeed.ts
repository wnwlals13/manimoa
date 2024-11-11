import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFeed } from '../api';
import { useRouter } from 'next/navigation';
import { uploadFeedRequestDto } from '../type';

export const useUploadFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<Promise<void>, Error, uploadFeedRequestDto>({
    mutationFn: uploadFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feeds', 'myfeeds', 'expense'],
      });
      router.push('/');
    },
  });
};
