'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { useEffect, useState } from 'react';
import SocketIoClient, { Socket } from 'socket.io-client';
import MessageInput from '@/components/chat/message-input';
import MessageList from '@/components/chat/message-list';

export default function Page({ params }: { params: { id: string } }) {
  const { user } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false); // 채팅 연결 여부
  const [roomId, setRoomId] = useState<string>(params.id); // 연결된 채팅 방

  const connectToChatServer = () => {
    setIsConnected(true);
    const _socket = SocketIoClient(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
      query: { chatRoomId: params.id },
    });
    setSocket(_socket);
    _socket?.emit('joinChatRoom', user?.uid);
  };

  const disconnectToChatServer = () => {
    socket?.disconnect();
  };

  useEffect(() => {
    if (!socket?.connected) {
      connectToChatServer();
      setRoomId(params.id);
    }
    console.log('isConnected', isConnected);
    socket?.on('connect', connectToChatServer);
    return () => {
      disconnectToChatServer();
      socket?.off('connect', connectToChatServer);
    };
  }, []);

  return (
    <>
      <MessageList roomId={roomId} socket={socket} />
      <MessageInput roomId={roomId} socket={socket} />
    </>
  );
}
