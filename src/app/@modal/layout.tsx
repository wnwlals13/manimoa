'use client';

import { useModalStore } from '@/store/modal/useModalStore';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('@/components/ui/modal'), { ssr: false });

export default function Layout({
  comment,
  setting,
  children,
}: {
  comment: React.ReactNode;
  setting: React.ReactNode;
  children: React.ReactNode;
}) {
  const { type } = useModalStore();
  console.log('modal layour', type);
  return (
    <Modal type={type}>
      {type === 'comment' ? comment : setting}
      {children}
    </Modal>
  );
}
