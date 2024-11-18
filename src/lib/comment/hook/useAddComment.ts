import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment } from '../api';
import { CommentData } from '@/types';
import { NewComment } from '../type';
import { COMMENT_KEY } from '../key';

export function useAddComment(feedId: string) {
  const queryClient = useQueryClient();
  return useMutation<CommentData, Error, NewComment>({
    mutationFn: addComment,
    onSuccess: (res) => {
      console.log(res, feedId, queryClient.getQueryData([COMMENT_KEY, feedId]));
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY, feedId],
      });
    },
  });
}
