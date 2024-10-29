'use client';

import { useModalStore } from '@/store/modal/useModalStore';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: ReactNode }) {
  const { isOpen, setIsOpen } = useModalStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return createPortal(
    <section
      className={`${
        isOpen ? '' : 'modal-close hidden'
      } fixed inset-0 z-20 translate-y-0 bg-black bg-opacity-20 flex justify-center`}
      onClick={(e) => {
        if ((e.target as HTMLElement).nodeName === 'SECTION') {
          setIsOpen(false);
        }
      }}
      ref={dialogRef}
    >
      <div className="fixed w-[600px] h-[600px] bg-white  min-w-custom  bottom-0 rounded-tl-2xl rounded-tr-2xl flex flex-col justify-between overflow-hidden">
        {children}
      </div>
    </section>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
