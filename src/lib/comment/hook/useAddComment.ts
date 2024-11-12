import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api';
import { CommentData } from '@/types';
import { NewComment } from '../type';

export function useAddComment(feedId: string) {
  const queryClient = useQueryClient();
  return useMutation<CommentData, Error, NewComment>({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comment', feedId],
      });
    },
  });
}
