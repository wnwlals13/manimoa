import { FiBell } from 'react-icons/fi';
import logo from '@/styles/logo.png';
import Image from 'next/image';

export default function Header() {
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
