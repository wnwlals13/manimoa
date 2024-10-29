'use client';

import { FiChevronLeft, FiBell } from 'react-icons/fi';
import logo from '@/styles/logo.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CUSTOM_NAV_PATHS } from '@/constants';

export default function Header() {
  const pathname = usePathname() as string;
  const router = useRouter();

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
  } else
    return (
      <header className="fixed w-full max-w-custom h-[60px] p-default flex justify-between items-center bg-white z-10">
        <Image
          src={logo.src}
          width={80}
          height={100}
          alt="마니모아의 메인 로고입니다."
        />
        <div>
          <FiBell size="25" />
        </div>
      </header>
    );
}
