import Header from '@/components/common/header';
import Navigation from '@/components/common/navigation';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex-1 flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex-col w-full h-full">{children}</div>
        <Navigation />
      </div>
    </>
  );
}
