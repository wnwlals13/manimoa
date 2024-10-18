import Header from '@/components/common/header';
import Navigation from '@/components/common/navigation';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="ml-4 mr-4 pt-[60px] pb-[100px]">{children}</div>
      <Navigation />
    </>
  );
}
