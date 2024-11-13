'use client';

import { FiBell } from 'react-icons/fi';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import { CUSTOM_NAV_PATHS } from '@/constants';
import { usePathname } from 'next/navigation';
import ChatEditHeader from './custom-header/chat-edit-header';
import ChatHeader from './custom-header/chat-header';
import CustomHeader from './custom-header/custom-header';
import { Suspense } from 'react';

const renderHeader = (pathname: string) => {
  if (
    Object.keys(CUSTOM_NAV_PATHS).includes(pathname) ||
    pathname.startsWith('/user/') ||
    pathname.startsWith('/feed/')
  ) {
    const title = CUSTOM_NAV_PATHS[pathname];
    return <CustomHeader title={title} />;
  } else if (pathname.startsWith('/chat/room')) {
    return <CustomHeader />;
  } else if (pathname === '/chat') {
    return <ChatHeader />;
  } else if (pathname == '/chat/editRoom') {
    return <ChatEditHeader />;
  } else
    return (
      // 디폴트 헤더 영역
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
};

export default function Header() {
  const pathname = usePathname() as string;

  return <Suspense>{renderHeader(pathname)}</Suspense>;
}
