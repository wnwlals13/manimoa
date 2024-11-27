'use client';

import { useRouter } from 'next/navigation';
import { Button, ButtonProps, buttonVariants } from './button';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { VariantProps } from 'class-variance-authority';
import { useModalStore } from '@/store/modal/useModalStore';

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    ButtonProps {
  name: string;
  children?: React.ReactNode;
  isIcon?: boolean;
}

export default function InteractiveButton({
  children,
  name,
  isIcon = false,
  icon,
  ...props
}: InteractiveButtonProps) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { setIsOpen, setModalContent } = useModalStore(); //모달 Store

  // 버튼 name에 따라 인터랙션하는 분기처리
  const handleClick = () => {
    if (name.includes('edit_profile')) {
      router.push(`/mypage/edit`);
    } else if (name.includes('logout')) {
      logout();
      router.push('/login');
    } else if (name.includes('add_feed')) {
      router.push(`/feed/form?isEdit=${false}`);
    } else if (name.includes('comments')) {
      const feedId = name.split('.')[1];
      setModalContent('comment', feedId);
      setIsOpen(true);
    } else if (name.includes('openModal')) {
      const feedId = name.split('.')[1];
      setIsOpen(true);
      setModalContent('setting', feedId);
    }
  };
  return (
    <>
      {
        <Button onClick={handleClick} icon={icon} {...props}>
          {children}
        </Button>
      }
    </>
  );
}
