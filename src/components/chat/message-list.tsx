'use client';

import { IMsg } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import MyMessage from './my-message';
import OtherMessage from './other-message';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useFetchAllMessages } from '@/lib/chat/hook/useFetchAllMessages';

interface MessageListProps {
  chats: IMsg | null;
  roomId: string;
}

export default function MessageList({ chats, roomId }: MessageListProps) {
  const { user } = useAuthStore();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [chat, setChat] = useState<IMsg[]>([]);

  const { data } = useFetchAllMessages(roomId); // 기존 채팅 이력
  const messageList = data?.messages;

  useEffect(() => {
    if (messageList) {
      setChat([...messageList]);
    }
  }, [messageList]);

  useEffect(() => {
    // 메세지 전송 시 추가된 메세지들
    if (chats) {
      setChat((currentMsg) => [
        ...currentMsg,
        {
          author: chats.author,
          msg: chats.msg,
          date: chats.date,
          roomId: chats.roomId,
        },
      ]);
    }
  }, [chats]);

  // 가장 최근 메세지가 보이도록 스크롤 하단 이동
  useEffect(() => {
    if (ulRef.current) ulRef.current.scrollTop = ulRef.current?.scrollHeight;
  }, [chat]);

  return (
    <ul
      ref={ulRef}
      className="flex-1 h-screen max-h-full bg-blue-100 p-default pt-[80px] pb-[100px] flex flex-col gap-2 overflow-y-scroll"
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
