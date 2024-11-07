import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFeed } from '../api';
import { useRouter } from 'next/navigation';

export const useUpdateFeed = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
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
