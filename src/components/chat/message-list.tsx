import { IMsg } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import MyMessage from './my-message';
import OtherMessage from './other-message';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { Socket } from 'socket.io-client';
import { useFetchAllMessages } from '@/app/lib/chat/hook/useFetchAllMessages';

interface MessageListProps {
  socket: Socket | null;
  roomId: string;
}

export default function MessageList({ socket, roomId }: MessageListProps) {
  const { user } = useAuthStore();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [chat, setChat] = useState<IMsg[]>([]);

  const { data } = useFetchAllMessages(roomId);
  const messageList = data?.messages;

  const onMessageReceived = (message: IMsg) => {
    setChat((currentMsg) => [
      ...currentMsg,
      {
        author: message.author,
        msg: message.msg,
        date: message.date,
        roomId: roomId,
      },
    ]);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('send message', onMessageReceived);

    return () => {
      socket?.off('send message', onMessageReceived);
    };
  }, [socket]);

  useEffect(() => {
    if (messageList) {
      setChat([...messageList]);
    }
  }, [messageList]);

  return (
    <ul
      ref={ulRef}
      className="flex-1 h-screen max-h-full bg-gray-200 p-default pt-[80px] pb-[100px] flex flex-col gap-2 overflow-y-scroll"
    >
      {chat.map((item, idx) =>
        item.author == user?.uid ? (
          <MyMessage key={idx} {...item} />
        ) : (
          <OtherMessage key={idx} {...item} />
        ),
      )}
    </ul>
  );
}
