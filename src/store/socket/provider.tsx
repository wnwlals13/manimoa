'use client';

import React, { createContext, useEffect, useState } from 'react';
import SocketIoClient, { Socket } from 'socket.io-client';
import { useAuthStore } from '../auth/useAuthStore';
import { IMsg } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { MESSAGES_KEY } from '@/lib/chat/key';

export interface SocketContextType {
  globalSocket: Socket | null;
  sockets: { [roomIndex: string]: Socket } | null;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, message: IMsg) => void;
  onMessageReceived: (message: IMsg) => void;
  chats: IMsg | null;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [globalSocket, setGlobalSocket] = useState<Socket | null>(null);
  const [sockets, setSockets] = useState<{ [roomId: string]: Socket }>({}); // 채팅방 정보
  const [isConnected, setIsConnected] = useState<boolean>(false); // 채팅 연결 여부
  const [chats, setChats] = useState<IMsg | null>(null); // 새로 수신된 메세지 저장소

  // 채팅방 소켓 연결 (연결된 소켓이 없는 경우에만 생성)
  const joinRoom = (roomId: string) => {
    if (!sockets || !sockets[roomId]) {
      const newSocket = SocketIoClient(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}`,
        {
          query: { chatRoomId: roomId },
        },
      );
      newSocket.on('connect', () => {
        console.log(`Connected to room: ${roomId}`);
      });
      newSocket.on('send message', onMessageReceived);
      newSocket.emit('joinRoom', roomId, user?.uid);
      setSockets((prev) => ({ ...prev, [roomId]: newSocket }));

      // 새로운 메세지 수신!
      queryClient.invalidateQueries({
        queryKey: [`messages-${roomId}`],
      });
    }
  };

  // 채팅방 소켓 연결 해제
  const leaveRoom = (roomId: string) => {
    setSockets((prevSockets) => {
      if (prevSockets[roomId]) {
        // 연결 해제 및 소켓 삭제
        prevSockets[roomId].disconnect();
        const updatedSockets = { ...prevSockets };
        delete updatedSockets[roomId];
        return updatedSockets;
      }
      return prevSockets;
    });
    setChats(null);
  };

  // 메세지 전송
  const sendMessage = (roomId: string, message: IMsg) => {
    sockets[roomId].emit(`chatting`, message);
  };

  // 메세지 수신
  const onMessageReceived = (message: IMsg) => {
    setChats({
      author: message.author,
      msg: message.msg,
      date: message.date,
      roomId: message.roomId,
    });

    // 새로운 메세지 수신!
    queryClient.invalidateQueries({
      queryKey: [`${MESSAGES_KEY}-${message.roomId}`],
    });
  };

  // 전역 소켓 연결
  const connectToSocket = () => {
    const _socket = SocketIoClient(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
      withCredentials: true,
    });
    setGlobalSocket(_socket);
    setIsConnected(true);
  };

  // 전역 소켓 해제
  const disconnectToSocket = () => {
    globalSocket?.disconnect();
    setIsConnected(false);
    setChats(null);
  };

  useEffect(() => {
    if (!globalSocket?.connected) {
      connectToSocket();
    }
    if (globalSocket?.connected) {
      disconnectToSocket();
    }

    globalSocket?.on('connect', connectToSocket);
    globalSocket?.on('disconnect', disconnectToSocket);

    return () => {
      disconnectToSocket();
      globalSocket?.off('connect', connectToSocket);
      globalSocket?.off('disconnect', disconnectToSocket);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        globalSocket,
        sockets,
        joinRoom,
        leaveRoom,
        sendMessage,
        onMessageReceived,
        chats,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
