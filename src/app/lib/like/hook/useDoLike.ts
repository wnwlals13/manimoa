import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doLike } from '../api';

export interface likeDto {
  feedId: number;
  userId: string;
}

export function useLike() {
  const queryClient = useQueryClient();
  return useMutation<Promise<void>, Error, likeDto>({
    mutationFn: doLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });
}
