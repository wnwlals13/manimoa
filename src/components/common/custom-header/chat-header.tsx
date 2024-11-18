import { useChatStore } from '@/store/chat/useChatStore';
import { useRouter } from 'next/navigation';
import { FiSettings, FiUserPlus } from 'react-icons/fi';

export default function ChatHeader() {
  const router = useRouter();
  const { roomCnt } = useChatStore();

  const handleAddChatRoom = () => {
    router.push('/chat/addChat');
  };

  // 채팅방 더보기 버튼
  const handleMore = () => {
    if (roomCnt < 1) return;

    router.push('/chat/editRoom');
  };

  return (
    <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-start items-center bg-white z-10">
      <h1 className="flex-1 font-bold">채팅</h1>
      <div className="flex gap-2">
        <FiUserPlus
          style={{ cursor: 'pointer' }}
          size={25}
          onClick={handleAddChatRoom}
        />
        <FiSettings
          style={{ cursor: 'pointer' }}
          size={25}
          onClick={handleMore}
        />
      </div>
    </header>
  );
}
