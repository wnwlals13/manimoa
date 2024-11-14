'use client';

import { CommentList } from '@/components/comment/comment-list';
import { useFetchComments } from '@/lib/comment/hook/useFetchComments';
import { useUpdateComment } from '@/lib/comment/hook/useUpdateComment';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ROWS_PER_PAGE = 10;

export function CommentSection({ feedId }: { feedId: string }) {
  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useFetchComments({
      feedId: feedId,
      pageSize: ROWS_PER_PAGE,
    });

  const updateCommentHook = useUpdateComment(feedId);

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleMutate = (content: string, commentId: string) => {
    updateCommentHook.mutate({ content, commentId });
  };

  if (isPending) return <></>;
  const commentsGroup = data ? data.pages.map((page) => page.comments) : [];

  return (
    <div>
      <CommentList comments={commentsGroup} mutateFn={handleMutate} />
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref} style={{ width: '100%', height: 80 }} />
      )}
    </div>
  );
}
