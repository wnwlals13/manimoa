'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { CUSTOM_NAV_PATHS } from '@/constants';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  if (Object.keys(CUSTOM_NAV_PATHS).includes(pathname)) {
    return <></>;
  } else
    return (
      <nav className="fixed bottom-0 w-full max-w-custom flex justify-between p-5 bg-white shadow-2xl z-10">
        <Link href={'/'}>
          <FiHome size="25" />
        </Link>
        <Link href={'/search'}>
          <FiSearch size="25" />
        </Link>
        <Link href={'/chat'}>
          <FiMessageCircle size="25" />
        </Link>
        <Link href={'/mypage'}>
          <FiUser size="25" />
        </Link>
      </nav>
    );
}
