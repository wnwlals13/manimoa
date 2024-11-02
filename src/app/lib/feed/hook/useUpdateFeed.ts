import { useMutation } from '@tanstack/react-query';
import { updateFeed } from '../api';
import { useRouter } from 'next/navigation';

export const useUpdateFeed = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateFeed,
    onSuccess: (response) => {
      console.log(response);
      router.push('/');
    },
  });
};
