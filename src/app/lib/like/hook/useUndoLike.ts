import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import { undoLike } from '../api';

export interface likeDto {
  feedId: number;
}

export function useUnLike(refetch: () => Promise<QueryObserverResult>) {
  return useMutation<Promise<void>, Error, likeDto>({
    mutationFn: undoLike,
    onSuccess: () => {
      refetch();
    },
  });
}
