import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api';
import { removeCommentDto } from '../type';
import { COMMENT_KEY } from '../key';

export function useRemoveComment(feedId: string) {
  const queryClient = useQueryClient();
  return useMutation<Promise<any>, Error, removeCommentDto>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY, feedId],
      });
    },
  });
}
