import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api';

interface removeCommentDto {
  commentId: string;
  feedId: string;
}

export function useRemoveComment(feedId: string) {
  const queryClient = useQueryClient();
  return useMutation<Promise<any>, Error, removeCommentDto>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comment', feedId],
      });
    },
  });
}
