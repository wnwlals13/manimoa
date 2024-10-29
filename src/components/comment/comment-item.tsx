'use client';

import { CommentData } from '@/types';
import Profile from '../ui/profile';
import { Button } from '../ui/button';
import InteractiveButton from '../ui/interactiveButton';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { deleteComment } from '@/app/lib/comment/api';

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
  const { id, userId, userName, content, profileImg, feedId } = comments;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      setIsEdit(false);
      setNowEdit(false);
    };
  }, []);

  return (
    <div className="flex justify-between gap-5 items-center border-b">
      <div className="flex-1 flex items-center gap-5 pb-default pt-default">
        <Profile profileImg={profileImg} />
        <div className="flex-1">
          <div>{userName}</div>
          {!isEdit ? (
            <div>{content}</div>
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
              variant="submain"
              onClick={() => {
                const content = inputRef.current?.value as string;
                const commentId = id;
                // mutate({ content, commentId });
                mutateFn(content, commentId.toString());
                setNowEdit(false);
                setIsEdit(false);
                // router.refresh();
              }}
              // onClick={onhandlemutate}
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
          <div>
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
              onClick={() => {
                deleteComment(id, feedId);
              }}
            >
              삭제
            </Button>
          </div>
        )
      ) : null}
    </div>
  );
}
