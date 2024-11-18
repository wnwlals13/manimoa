'use client';

import { IMsg } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import MyMessage from './my-message';
import OtherMessage from './other-message';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useFetchAllMessages } from '@/lib/chat/hook/useFetchAllMessages';
import { formatChatDate } from '@/util/formatChatDate';
import { useInView } from 'react-intersection-observer';

export interface MessageListProps {
  chats: IMsg | null;
  roomId: string;
}

export interface IMsgDate {
  type: 'date';
  date: string;
}

export default function MessageList({ chats, roomId }: MessageListProps) {
  const { user } = useAuthStore();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [chat, setChat] = useState<IMsg[]>([]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useFetchAllMessages(roomId); // 기존 채팅 이력

  const messageGrpLast: IMsg[] = data?.pages[data?.pages.length - 1].data || [];

  const isIMsgDate = (item: IMsg | IMsgDate): item is IMsgDate => {
    return (item as IMsgDate).type === 'date';
  };

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });

  // 채팅 날짜별로 그룹화하여 렌더링하기
  const renderChatWithDate = (items: IMsg[]): React.ReactNode => {
    const result: (IMsg | IMsgDate)[] = [];
    let lastDate: any = null;

    items.forEach((item) => {
      const messageDate = new Date(item.date); // 메세지 전송 날짜
      const formatDate = formatChatDate(messageDate);

      // 이전 메세지 전송일자가 없거나 메세지 전송 일자가 다른 경우 날짜를 목록에 추가한다.
      if (!lastDate || formatDate !== formatChatDate(lastDate)) {
        result.push({
          type: 'date',
          date: `${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`,
        });
      }

      result.push(item);
      lastDate = messageDate; // 마지막 전송일자 설정
    });

    return (
      <>
        {result.map((item, idx) => {
          if (isIMsgDate(item)) {
            return (
              <div className="flex justify-center mb-2" key={idx}>
                <p className="bg-blue-200 p-1 pl-2 pr-2 rounded-2xl text-sm">
                  {item.date}
                </p>
              </div>
            );
          } else {
            {
              return item.author === user?.uid ? (
                <MyMessage key={idx} {...item} />
              ) : (
                <OtherMessage key={idx} {...item} />
              );
            }
          }
        })}
      </>
    );
  };

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
    // console.log('chat', chat, hasNextPage);
    if (ulRef.current) ulRef.current.scrollTop = ulRef.current?.scrollHeight;
  }, [chat]);

  // 데이터 로딩이 끝나면 메세지 담기
  useEffect(() => {
    if (!isLoading && !isFetchingNextPage) {
      messageGrpLast.forEach((item) => setChat((prev) => [item, ...prev]));
    }
  }, [isLoading, isFetchingNextPage]);

  useEffect(() => {
    //clean up
    return () => {
      setChat([]);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul
      ref={ulRef}
      className="flex-1 h-screen max-h-full bg-blue-100 p-default pb-[100px] flex flex-col gap-2 overflow-y-scroll"
    >
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref} style={{ width: '100%', height: 80 }} />
      )}
      {renderChatWithDate(chat)}
    </ul>
  );
}
