import { updateComment } from './../api';
import {
  InfiniteData,
  QueryClient,
  QueryObserverResult,
  useMutation,
} from '@tanstack/react-query';
import { CommentData } from '@/types';

export interface updateCommentDto {
  content: string;
  commentId: string;
}

export function useUpdateComment(
  feedId: string,
  refetch: () => Promise<QueryObserverResult>,
) {
  const queryClient = new QueryClient();
  return useMutation<CommentData, Error, updateCommentDto>({
    mutationFn: updateComment,
    onSuccess: (newData) => {
      queryClient.setQueryData(
        ['comment', feedId],
        (oldData: InfiniteData<[], []>) => {
          if (!oldData) return undefined;
          return {
            ...newData,
            pages: oldData.pages.slice(0, 1),
            pageParams: oldData.pageParams.slice(0, 1),
          };
        },
      );
      refetch();
      queryClient.invalidateQueries({
        queryKey: ['comment', feedId.toString()],
      });
    },
  });
}
