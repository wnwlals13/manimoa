import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 w-full max-w-custom flex justify-between p-5 bg-white shadow-2xl z-10">
      <Link href={'/'}>
        <FiHome size="25" />
      </Link>
      <Link href={''}>
        <FiSearch size="25" />
      </Link>
      <Link href={''}>
        <FiMessageCircle size="25" />
      </Link>
      <Link href={''}>
        <FiUser size="25" />
      </Link>
    </nav>
  );
}
