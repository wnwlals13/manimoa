import { updateComment } from './../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentData } from '@/types';
import { updateCommentDto } from '../type';

export function useUpdateComment(feedId: string) {
  const queryClient = useQueryClient();
  return useMutation<CommentData, Error, updateCommentDto>({
    mutationFn: updateComment,
    onSuccess: (res) => {
      console.log(res, feedId, queryClient.getQueryData(['comment', feedId]));
      queryClient.invalidateQueries({
        queryKey: ['comment', feedId],
      });
    },
  });
}
