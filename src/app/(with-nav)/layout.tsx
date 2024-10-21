import Header from '@/components/common/header';
import Navigation from '@/components/common/navigation';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const token = cookies().get('token') as RequestCookie;
  const users = cookies().get('user') as RequestCookie;

  return (
    <>
      <Header />
      <div className="w-full p-default pt-[70px] pb-[100px] max-w-custom">
        {children}
      </div>
      <Navigation
        token={token ? token.value : ''}
        cookies={users ? JSON.parse(users.value) : ''}
      />
    </>
  );
}
