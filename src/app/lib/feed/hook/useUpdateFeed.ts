import { updateFeed } from './../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { updateFeedRequestDto } from '../type';

export const useUpdateFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<Promise<void>, Error, updateFeedRequestDto>({
    mutationFn: updateFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      queryClient.invalidateQueries({ queryKey: ['myfeeds'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });
      queryClient.invalidateQueries({ queryKey: ['month-expense'] });

      router.push('/');
    },
  });
};
