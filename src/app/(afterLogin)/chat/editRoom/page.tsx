'use client';

import { useFetchMyChatRooms } from '@/lib/chat/hook/useFetchMyChatRooms';
import { EditChatItem } from '@/components/chat/edit-chat-item';
import { ChangeEvent, useEffect } from 'react';
import ChatListSkeleton from '@/components/ui/skeleton/chat/chat-list-skeleton';
import { useChatStore } from '@/store/chat/useChatStore';

export default function Page() {
  const {
    willRemoveRooms,
    filterWillRemoveRooms,
    setWillRemoveCnt,
    setWillRemoveRooms,
  } = useChatStore();

  const { data, isLoading } = useFetchMyChatRooms({ pageSize: 10 });

  const chats = data ? data?.pages.flatMap((page) => page.chats) : [];

  const handleDelete = (e: ChangeEvent<HTMLInputElement>, roomId: string) => {
    if (e.target.checked) {
      setWillRemoveRooms(roomId);
    } else {
      filterWillRemoveRooms(roomId);
    }
  };

  useEffect(() => {
    setWillRemoveCnt(willRemoveRooms.length);
  }, [willRemoveRooms]);

  if (isLoading) return <ChatListSkeleton count={10} />;

  return (
    <div className="p-default pt-[60px]">
      {chats?.map((chat) => (
        <EditChatItem key={chat.roomId} handleDelete={handleDelete} {...chat} />
      ))}
    </div>
  );
}
