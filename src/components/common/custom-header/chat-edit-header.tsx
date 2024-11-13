import { useRemoveChat } from '@/lib/chat/hook/useRemoveChat';
import { useChatStore } from '@/store/chat/useChatStore';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ChatEditHeader() {
  const router = useRouter();
  const { willRemoveRoomCnt, willRemoveRooms, resetRemoveRooms } =
    useChatStore();
  const { mutate } = useRemoveChat();

  // 채팅방 삭제 버튼
  const handleRemoveChats = () => {
    if (
      confirm(
        '채팅방에 나가면 채팅 기록을 확인하실 수 없습니다. \n 정말 나가시겠습니까?',
      )
    ) {
      mutate({ willRemoveRooms });
    }
    resetRemoveRooms();
  };

  const handleClose = () => {
    resetRemoveRooms();
    router.back();
  };

  return (
    <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-between items-center bg-white z-10">
      <div className="cursor-pointer" onClick={handleClose}>
        완료
      </div>
      <div className="cursor-pointer" onClick={handleRemoveChats}>
        {willRemoveRoomCnt > 0 ? `${willRemoveRoomCnt} 나가기` : ''}
      </div>
    </header>
  );
}
