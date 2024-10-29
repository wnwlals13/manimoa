'use client';

import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from './button';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { VariantProps } from 'class-variance-authority';
import { useDeleteFeed } from '@/app/lib/feed/hook/useDeleteFeed';
import { useModalStore } from '@/store/modal/useModalStore';

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: 'default' | 'outline' | 'main' | 'submain';
  size?: 'default' | 'full' | 'sm';
  className?: string;
  name: string;
  children?: React.ReactNode;
}

export default function InteractiveButton({
  variant,
  size,
  children,
  name,
  ...props
}: InteractiveButtonProps) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { setIsOpen, setModalContent } = useModalStore();

  const { mutate, isPending: isLoading } = useDeleteFeed();

  const onClick = () => {
    if (name === 'edit_profile') {
      router.push(`/mypage/edit`);
    } else if (name === 'logout') {
      logout();
      router.push('/login');
    } else if (name === 'add_feed') {
      // 새 피드 작성
      router.push(`/feed/form?isEdit=${false}`);
    } else if (name.startsWith('edit_feed')) {
      // 유저가 작성한 피드 수정
      const feedId = name.split('.')[1];
      router.push(`/feed/form?isEdit=${true}&feedId=${feedId}`);
    } else if (name.startsWith('delete_feed')) {
      const feedId = name.split('.')[1];
      mutate(feedId);
      router.refresh();
    } else if (name.startsWith('comments')) {
      // 댓글 모달창
      const feedId = name.split('.')[1];
      setIsOpen(true);
      setModalContent('comment', feedId);
    }
  };
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {children}
    </Button>
  );
}
