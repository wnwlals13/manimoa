'use client';

import { useContext, useEffect } from 'react';
import MessageInput from '@/components/chat/message-input';
import MessageList from '@/components/chat/message-list';
import { SocketContext, SocketContextType } from '@/store/socket/provider';

export default function Page({ params }: { params: { id: string } }) {
  const { sendMessage, chats, joinRoom, leaveRoom } = useContext(
    SocketContext,
  ) as SocketContextType;

  useEffect(() => {
    joinRoom(params.id);

    // 언마운트 시 채팅방 나감
    return () => {
      leaveRoom(params.id);
    };
  }, []);

  return (
    <>
      <MessageList roomId={params.id} chats={chats} />
      <MessageInput roomId={params.id} sendMessage={sendMessage} />
    </>
  );
}
