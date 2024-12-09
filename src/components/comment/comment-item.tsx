'use client';

import { CommentData } from '@/types';
import Profile from '../ui/profile';
import { Button } from '../ui/button/button';
import InteractiveButton from '../ui/button/interactive-button';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/inputs/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useRemoveComment } from '@/lib/comment/hook/useRemoveComment';
import { formatDate } from '@/util/formatDate';

interface CommentItemProps {
  comments: CommentData;
  loginUserId?: string;
  mutateFn: (content: string, commentId: string) => void;
}

export function CommentItem({
  comments,
  loginUserId,
  mutateFn,
}: CommentItemProps) {
  const { nowEdit, setNowEdit } = useAuthStore();
  const { id, userId, userName, content, profileImg, feedId, createdAt } =
    comments;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const removeFn = useRemoveComment(String(feedId));

  useEffect(() => {
    return () => {
      setIsEdit(false);
      setNowEdit(false);
    };
  }, []);

  return (
    <div className="flex justify-between gap-5 items-center">
      <div className="flex-1 flex items-center gap-5 pt-[12px] mb-2">
        <Profile src={profileImg as string} size="sm" />
        <div className="flex-1">
          <div className="flex gap-2">
            <p className="text-sm min-w-[]">{userName}</p>
            <p className="text-[12px] text-gray-500">{formatDate(createdAt)}</p>
          </div>
          {!isEdit ? (
            <div className="text-sm">{content}</div>
          ) : (
            <Input
              defaultValue={content}
              style={{ width: '100%' }}
              ref={inputRef}
            />
          )}
        </div>
      </div>
      {userId === Number(loginUserId) ? (
        isEdit ? (
          <div className="flex gap-1">
            <Button
              variant="accent"
              onClick={() => {
                const content = inputRef.current?.value as string;
                const commentId = id;

                mutateFn(content, commentId.toString());
                setNowEdit(false);
                setIsEdit(false);
              }}
              disabled={inputRef.current ? !inputRef.current.value : false}
            >
              저장
            </Button>
            <Button
              onClick={() => {
                setIsEdit(false);
                setNowEdit(false);
              }}
            >
              취소
            </Button>
          </div>
        ) : (
          <div className="flex gap-1">
            <InteractiveButton
              variant="outline"
              name=""
              onClick={() => {
                if (nowEdit) {
                  return alert('작성중인 글을 저장해주세요.');
                }
                setIsEdit(true);
                setNowEdit(true);
              }}
            >
              수정
            </InteractiveButton>
            <Button
              onClick={() =>
                removeFn.mutate({
                  commentId: String(id),
                  feedId: String(feedId),
                })
              }
            >
              삭제
            </Button>
          </div>
        )
      ) : null}
    </div>
  );
}
