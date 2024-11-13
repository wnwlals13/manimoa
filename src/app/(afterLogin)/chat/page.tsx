'use client';
import ChatItem from '@/components/chat/chat-item';
import { Button } from '@/components/ui/button/button';
import ChatListSkeleton from '@/components/ui/skeleton/chat/chat-list-skeleton';
import { useFetchMyChatRooms } from '@/lib/chat/hook/useFetchMyChatRooms';
import { IChatRoom } from '@/types';
import { useRouter } from 'next/navigation';

function ChatRooms({ chat }: { chat: IChatRoom[] }) {
  const router = useRouter();
  const handleAddChat = () => {
    router.push('/chat/addChat');
  };

  return (
    <div className="p-default pt-[60px] min-h-full h-full relative">
      {chat.length > 0 ? (
        chat.map((item: IChatRoom) => <ChatItem key={item.roomId} {...item} />)
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
  const { data, isLoading } = useFetchMyChatRooms({ pageSize: 10 });

  if (isLoading) return <ChatListSkeleton count={10} />;

  const chatsGroup = data?.pages.map((page) => page.chats) || [];

  return (
    <>
      {chatsGroup.map((chats, i) => (
        <ChatRooms key={i} chat={chats} />
      ))}
    </>
  );
}
