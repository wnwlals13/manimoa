import {
  QueryClient,
  QueryObserverResult,
  useMutation,
} from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { doLike } from '../api';

export interface likeDto {
  feedId: number;
}

export function useLike(refetch: () => Promise<QueryObserverResult>) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = new QueryClient();

  return useMutation<Promise<void>, Error, likeDto>({
    mutationFn: doLike,
    onSuccess: () => {
      refetch();
    },
  });
}
