'use client';

import { useModalStore } from '@/store/modal/useModalStore';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button/button';

export default function Modal({
  type,
  children,
}: {
  type: string;
  children: ReactNode;
}) {
  const { isOpen, setIsOpen } = useModalStore();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const renderTitle = () => {
    switch (type) {
      case 'comment':
        return '댓글';
      case 'setting':
        return '설정';
      default:
        return `${type}`;
    }
  };

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
      <div
        className={`${
          type == 'comment' ? `h-[600px]` : `h-[150px]`
        } fixed w-[600px] bg-white  min-w-custom  bottom-0 rounded-tl-2xl rounded-tr-2xl flex flex-col overflow-hidden`}
      >
        <div className="flex justify-end items-center pl-default pr-default mt-3">
          <p className="flex-1 flex justify-start items-center font-bold h-[50px] w-full max-w-custom bg-white">
            {renderTitle()}
          </p>
          <Button variant="none" size="sm" onClick={() => setIsOpen(false)}>
            X
          </Button>
        </div>
        {children}
      </div>
    </section>,
    document.getElementById('modal-root') as HTMLElement,
  );
}
