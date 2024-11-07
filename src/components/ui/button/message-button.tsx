'use client';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { useNewChat } from '@/app/lib/chat/hook/useNewChat';

interface MessageButtonProps {
  targetId: string;
  loginId: string;
  isChatExist: string;
  roomId: string;
  children: React.ReactNode;
}

export function MessageButton({
  targetId,
  loginId,
  isChatExist,
  roomId,
  children,
}: MessageButtonProps) {
  const router = useRouter();
  const { mutate } = useNewChat();

  // 채팅방 생성 혹은 입장
  const onHandleJoin = () => {
    if (!targetId || !loginId) return;
    const joinIds = [targetId, loginId];

    if (!isChatExist && !roomId) {
      console.log('새 채팅방입니다.');
      mutate({ userIds: joinIds });
    } else {
      console.log('존재합니다.');
    }
    router.push(`/chat/room/${roomId}`);
  };

  return (
    <Button className="w-full" onClick={onHandleJoin}>
      {children}
    </Button>
  );
}
