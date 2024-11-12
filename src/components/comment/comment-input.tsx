'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/inputs/input';
import InteractiveButton from '../ui/button/interactive-button';
import { FiSend } from 'react-icons/fi';
import { useEffect } from 'react';
import { useAddComment } from '@/lib/comment/hook/useAddComment';

export interface CommentInputs {
  content: string;
}

export interface CommontInputProps {
  feedId: string;
}

export default function CommentInput({ feedId }: CommontInputProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: { content: '' },
  });
  const { user } = useAuthStore();
  const addCommentHook = useAddComment(feedId);

  const onsubmit = (data: CommentInputs) => {
    addCommentHook.mutate({
      content: data.content,
      writer: user?.uid as string,
      feedId: feedId,
    });
    setValue('content', '');
  };

  useEffect(() => {
    return () => {
      reset({ content: '' }); // 댓글창 나가면 인풋태그 초기화
    };
  }, [reset]);

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="fixed bottom-0 w-full max-w-custom flex justify-center items-center gap-2 pt-4 pb-5 p-default bg-white"
    >
      <Input type="text" {...register('content', { required: true })} />
      <InteractiveButton type="submit" name="add-comment" disabled={!isValid}>
        <FiSend />
      </InteractiveButton>
    </form>
  );
}
