'use client';

import { useAuthStore } from '@/store/auth/useAuthStore';
import { UserData } from '@/types';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiHome } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

export default function Navigation({
  token,
  cookies,
}: {
  token?: string;
  cookies?: UserData;
}) {
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    if (cookies) setUser(cookies);
    console.log(token);
  }, [cookies]);
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
      <Link href={user ? `/user/${user && user.uid}` : '/login'}>
        <FiUser size="25" />
      </Link>
    </nav>
  );
}
