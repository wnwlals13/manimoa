import { useMutation } from '@tanstack/react-query';
import { uploadFeed } from '../api';
import { useRouter } from 'next/navigation';

export const useUploadFeed = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: uploadFeed,
    onSuccess: (response) => {
      console.log(response);
      router.push('/');
    },
  });
};
