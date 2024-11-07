import { useMutation, useQueryClient } from '@tanstack/react-query';
import { undoLike } from '../api';

export interface likeDto {
  feedId: number;
  userId: string;
}

export function useUnLike() {
  const queryClient = useQueryClient();
  return useMutation<Promise<void>, Error, likeDto>({
    mutationFn: undoLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });
}
