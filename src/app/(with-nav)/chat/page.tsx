'use client';
import { useFetchMyChatRooms } from '@/app/lib/chat/hook/useFetchMyChatRooms';
import { IChatRoom } from '@/types';
import { formatChatDate } from '@/util/formatChatDate';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

function ChatRooms({ chat }: { chat: IChatRoom[] }) {
  return (
    <div className="p-default pt-[60px]">
      {chat && chat.length > 0 ? (
        chat.map((item: IChatRoom) => (
          <Link
            key={item.roomId}
            href={{
              pathname: `/chat/room/${item.roomId}`,
              query: { otherUserEmail: item.participantEmails[0].email },
            }}
            className="flex border-b [&:not(:first-child)]:pt-default pb-default gap-2"
          >
            <div className="w-[45px] h-[45px] bg-gray-200 flex justify-center items-center rounded-full overflow-hidden">
              {item.participantProfiles && item.participantProfiles[0] && (
                <Image
                  width={45}
                  height={45}
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item.participantProfiles[0].profileImg}`}
                  alt=""
                  style={{ height: `100%` }}
                ></Image>
              )}
            </div>
            <div className="flex-1 flex justify-start items-center">
              {item.participantEmails[0].email}
            </div>
            <div className="flex justify-center items-center text-sm">
              {formatChatDate(item.createdAt)}
            </div>
          </Link>
        ))
      ) : (
        <div className="flex justify-center items-center mt-5">
          <p>채팅이 없습니다.</p>
          <p>채팅을 시작해보세요.</p>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const { data, isLoading } = useFetchMyChatRooms();
  if (isLoading) return <div>Loading...</div>;

  const chat = data?.chat || [];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatRooms chat={chat} />
    </Suspense>
  );
}
