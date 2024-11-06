'use client';
import { useFetchMyChatRooms } from '@/app/lib/chat/hook/useFetchMyChatRooms';
import { IChatRoom } from '@/types';
import Link from 'next/link';
import { Suspense } from 'react';

function ChatRooms() {
  const { data } = useFetchMyChatRooms();
  const rooms = data?.chatRooms;
  return (
    <div className="p-default">
      {rooms &&
        rooms.map((item: IChatRoom, idx: number) => (
          <Link
            key={idx}
            href={{
              pathname: `/chat/room/${item.roomId}`,
              query: { otherUserEmail: item.otherUserEmail },
            }}
            className="flex border-b [&:not(:first-child)]:pt-default pb-default gap-2"
          >
            <div className="w-[45px] h-[45px] bg-gray-200 flex justify-center items-center rounded-full">
              img
            </div>
            <div className="flex-1 flex justify-start items-center">
              {item.otherUserEmail}
            </div>
            <div className="flex justify-center items-center text-sm">
              오후 7:04
            </div>
          </Link>
        ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatRooms />
    </Suspense>
  );
}
