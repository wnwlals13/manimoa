import { QueryClient, useMutation } from '@tanstack/react-query';
import { addComment } from '../api';
import { CommentData } from '@/types';

export interface NewComment {
  content: string;
  writer: string;
  feedId: string;
}

export function useAddComment(id: string) {
  const queryClient = new QueryClient();
  return useMutation<CommentData, Error, NewComment>({
    mutationFn: addComment,
    onSuccess: (res) => {
      console.log('update callback :', res);
      queryClient.invalidateQueries({ queryKey: ['comment', id] });
    },
  });
}
