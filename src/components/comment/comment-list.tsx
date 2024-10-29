'use client';

import { CommentData } from '@/types';
import { CommentItem } from './comment-item';
import { useFetchComments } from '@/app/lib/comment/hook/useFetchComments';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { updateCommentDto } from '@/app/lib/comment/hook/useUpdateComment';

const ROWS_PER_PAGE = 20;

export function CommentList({
  comments,
  mutateFn,
}: {
  comments: CommentData[][];
  mutateFn: (content: string, commentId: string) => void;
}) {
  const { user } = useAuthStore();

  if (comments.length == 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold mt-5 mb-5">아직 댓글이 없습니다.</h2>
        <p className="text-gray-400">댓글을 남겨보세요</p>
      </div>
    );

  return (
    <>
      {comments.map((comment, i) => (
        <div key={i}>
          {comment.map((item: CommentData, idx: number) => (
            <CommentItem
              key={idx}
              comments={item}
              loginUserId={user?.uid}
              mutateFn={mutateFn}
            />
          ))}
        </div>
      ))}
    </>
  );
}
