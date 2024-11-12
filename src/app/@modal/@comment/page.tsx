'use client';

import { useModalStore } from '@/store/modal/useModalStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CommentList } from '@/components/comment/comment-list';
import { useFetchComments } from '@/lib/comment/hook/useFetchComments';
import { useUpdateComment } from '@/lib/comment/hook/useUpdateComment';
import CommentInput from '@/components/comment/comment-input';

const ROWS_PER_PAGE = 10;

export default function Page() {
  const { id, isOpen } = useModalStore();

  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useFetchComments({
      feedId: id,
      pageSize: ROWS_PER_PAGE,
    });

  const updateCommentHook = useUpdateComment(id);

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

  if (!isOpen) return <></>;
  if (isPending) return <></>;
  const commentsGroup = data ? data.pages.map((page) => page.comments) : [];

  return (
    <>
      <div className="flex-1 flex flex-col justify-start items-center pb-[60px]">
        <h3 className="flex-1 absolute flex justify-center font-bold h-[50px] w-full max-w-custom bg-white p-3">
          댓글
        </h3>
        <div className="w-full max-h-[500px] overflow-scroll mt-[50px] pl-default pr-default">
          <CommentList comments={commentsGroup} mutateFn={handleMutate} />
          {isFetchingNextPage ? (
            <div>Loading...</div>
          ) : (
            <div ref={ref} style={{ width: '100%', height: 80 }} />
          )}
        </div>
        <CommentInput feedId={id} />
      </div>
    </>
  );
}
