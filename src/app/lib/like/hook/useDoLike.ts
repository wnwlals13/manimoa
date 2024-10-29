import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { doLike } from '../api';

export interface likeDto {
  feedId: number;
}

export function useLike(refetch: () => Promise<QueryObserverResult>) {
  return useMutation<Promise<void>, Error, likeDto>({
    mutationFn: doLike,
    onSuccess: () => {
      refetch();
    },
  });
}
