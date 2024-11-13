'use client';

import { useFetchMyChatRooms } from '@/lib/chat/hook/useFetchMyChatRooms';
import { EditChatItem } from '@/components/chat/edit-chat-item';
import { IChatRoom } from '@/types';
import { Suspense } from 'react';

function EditChatRoomList() {
  const { data, isLoading } = useFetchMyChatRooms({ pageSize: 10 });

  if (isLoading) return <div>Loading...</div>;

  const chatGroup = data?.pages.map((page) => page.chats) || [];
  return (
    <div className="p-default pt-[60px]">
      {chatGroup?.map((chat) =>
        chat.map((item: IChatRoom) => (
          <EditChatItem key={item.roomId} {...item} />
        )),
      )}
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
