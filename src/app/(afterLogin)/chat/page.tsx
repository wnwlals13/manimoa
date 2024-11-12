'use client';
import { Button } from '@/components/ui/button/button';
import { useFetchMyChatRooms } from '@/lib/chat/hook/useFetchMyChatRooms';
import { IChatRoom } from '@/types';
import { formatChatDate } from '@/util/formatChatDate';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function ChatRooms({ chat }: { chat: IChatRoom[] }) {
  const router = useRouter();
  const handleAddChat = () => {
    router.push('/chat/addChat');
  };

  return (
    <div className="p-default pt-[60px] min-h-full h-full relative">
      {chat.length > 0 ? (
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
        <div className="h-full flex flex-col justify-center gap-4 items-center mt-5">
          <p>내 채팅방이 없습니다.</p>
          <Button onClick={handleAddChat}>채팅하기</Button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const { data, isLoading } = useFetchMyChatRooms();
  if (isLoading) return <div>Loading...</div>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatRooms chat={data?.chat as IChatRoom[]} />
    </Suspense>
  );
}
