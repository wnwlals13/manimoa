'use client';

import { useAddComment } from '@/app/lib/comment/hook/useAddComment';
import { useFetchComments } from '@/app/lib/comment/hook/useFetchComments';
import { useUpdateComment } from '@/app/lib/comment/hook/useUpdateComment';
import { useModalStore } from '@/store/modal/useModalStore';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import Cookies from 'js-cookie';
import { CommentList } from '@/components/comment/comment-list';
import { Input } from '@/components/ui/input';
import InteractiveButton from '@/components/ui/button/interactive-button';
import { FiSend } from 'react-icons/fi';

interface commentInputs {
  content: string;
}

const ROWS_PER_PAGE = 20;

export default function Page() {
  const { id, isOpen } = useModalStore();

  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useFetchComments({
      feedId: id,
      pageSize: ROWS_PER_PAGE,
    });

  const addCommentHook = useAddComment(id);
  const updateCommentHook = useUpdateComment(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: { content: '' },
  });

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const onsubmit = (data: commentInputs) => {
    const cookieStore = Cookies.get('user') as string;
    const user = JSON.parse(cookieStore);
    addCommentHook.mutate({
      content: data.content,
      writer: user.uid,
      feedId: id,
    });
    setValue('content', '');
  };

  const handleMutate = (content: string, commentId: string) => {
    updateCommentHook.mutate({ content, commentId });
  };

  useEffect(() => {
    return () => {
      reset({ content: '' }); // 댓글창 나가면 인풋태그 초기화
    };
  }, [isOpen, reset]);

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
      </div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="fixed bottom-0 w-full max-w-custom flex gap-2 pt-4 pb-5 p-default bg-white"
      >
        <Input type="text" {...register('content', { required: true })} />
        <InteractiveButton type="submit" name="add-comment" disabled={!isValid}>
          <FiSend />
        </InteractiveButton>
      </form>
    </>
  );
}
