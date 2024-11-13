import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export default function CustomHeader({ title }: { title?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const otherUserEmail = searchParams.get('otherUserEmail');
  const otherUserEmailId = otherUserEmail?.split('@')[0] as string;

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
      <div className="flex-1 flex justify-center">
        {title || otherUserEmailId}
      </div>
    </header>
  );
}
