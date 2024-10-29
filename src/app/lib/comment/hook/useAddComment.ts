import { QueryClient, useMutation } from '@tanstack/react-query';
import { addComment } from '../api';
import { CommentData } from '@/types';
import { useRouter } from 'next/navigation';

export interface NewComment {
  content: string;
  writer: string;
  feedId: string;
}

export function useAddComment(id: string) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation<CommentData, Error, NewComment>({
    mutationFn: addComment,
    onSuccess: (res) => {
      // router.refresh();
      console.log('update callback :', res);
      queryClient.invalidateQueries({ queryKey: ['comment', id] });
      // queryClient.setQueryData(['comment'], (data: any) => {
      //   if (!data) return undefined;

      //   return {
      //     ...data,
      //     pages: data.pages.slice(0, 1),
      //     pageParams: data.pageParams.slice(0, 1),
      //   };
      // });
      // queryClient.refetchQueries();
    },
  });
}
