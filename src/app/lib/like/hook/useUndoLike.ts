import {
  QueryClient,
  QueryObserverResult,
  useMutation,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { undoLike } from '../api';

export interface likeDto {
  feedId: number;
}

export function useUnLike(refetch: () => Promise<QueryObserverResult>) {
  const queryClient = new QueryClient();

  return useMutation<Promise<void>, Error, likeDto>({
    mutationFn: undoLike,
    onSuccess: () => {
      refetch();
    },
  });
}
