'use client';

import { useFetchMyChatRooms } from '@/app/lib/chat/hook/useFetchMyChatRooms';
import { EditChatItem } from '@/components/chat/edit-chat-item';
import { IChatRoom } from '@/types';
import { Suspense } from 'react';

function EditChatRoomList() {
  const { data, isLoading } = useFetchMyChatRooms();

  if (isLoading) return <div>Loading...</div>;

  const chat = data?.chat || [];
  return (
    <div className="p-default pt-[60px]">
      {chat &&
        chat.map((item: IChatRoom) => (
          <EditChatItem key={item.roomId} {...item} />
        ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditChatRoomList />
    </Suspense>
  );
}
