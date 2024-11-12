'use client';

import { FiChevronLeft, FiBell, FiUserPlus, FiSettings } from 'react-icons/fi';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CUSTOM_NAV_PATHS } from '@/constants';
import { useChatStore } from '@/store/chat/useChatStore';
import { useRemoveChat } from '@/lib/chat/hook/useRemoveChat';
import { Suspense } from 'react';

function ChatRoomHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const otherUserEmail = searchParams.get('otherUserEmail');
  const otherUserEmailId = otherUserEmail?.split('@')[0];

  return (
    <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-start items-center bg-white z-10">
      <div className="absolute">
        <FiChevronLeft
          size="25"
          className="cursor-pointer"
          onClick={() => {
            // [TODO] 경고 문구
            router.replace('/chat');
          }}
        />
      </div>
      <div className="flex-1 flex justify-center">{otherUserEmailId}</div>
    </header>
  );
}

export default function Header() {
  const pathname = usePathname() as string;
  const router = useRouter();
  const { willRemoveRoomCnt, willRemoveRooms } = useChatStore();
  const { mutate } = useRemoveChat();

  const handleAddChatRoom = () => {
    router.push('/chat/addChat');
  };

  // 채팅방 더보기 버튼
  const handleMore = () => {
    router.push('/chat/editRoom');
  };

  // 채팅방 삭제 버튼
  const handleRemoveChats = () => {
    if (
      confirm(
        '채팅방에 나가면 채팅 내용이 모두 사라집니다. \n 정말 나가시겠습니까?',
      )
    ) {
      mutate({ willRemoveRooms });
    }
  };

  if (
    Object.keys(CUSTOM_NAV_PATHS).includes(pathname) ||
    pathname.startsWith('/user/')
  ) {
    const title = CUSTOM_NAV_PATHS[pathname];
    return (
      <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-start items-center bg-white z-10">
        <div className="absolute">
          <FiChevronLeft
            size="25"
            className="cursor-pointer"
            onClick={() => {
              // [TODO] 경고 문구
              router.back();
            }}
          />
        </div>
        <div className="flex-1 flex justify-center">{title}</div>
      </header>
    );
  } else if (pathname.startsWith('/chat/room')) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ChatRoomHeader />
      </Suspense>
    );
  } else if (pathname === '/chat') {
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
  } else if (pathname == '/chat/editRoom') {
    return (
      <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-between items-center bg-white z-10">
        <div onClick={() => router.back()}>완료</div>
        <div onClick={handleRemoveChats}>
          {willRemoveRoomCnt > 0 ? `${willRemoveRoomCnt} 나가기` : ''}
        </div>
      </header>
    );
  } else
    return (
      <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-between items-center bg-white z-10">
        <Image
          src={logo.src}
          width={80}
          height={100}
          alt="마니모아의 메인 로고입니다."
          priority={true}
        />
        <div>
          <FiBell size="25" />
        </div>
      </header>
    );
}
