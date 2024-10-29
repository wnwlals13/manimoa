'use client';

import { CommentData } from '@/types';
import { CommentItem } from './comment-item';
import { useAuthStore } from '@/store/auth/useAuthStore';

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
