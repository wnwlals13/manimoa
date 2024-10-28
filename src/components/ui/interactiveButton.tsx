'use client';

import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from './button';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { VariantProps } from 'class-variance-authority';
import { useFeedStore } from '@/store/feed/useFeedStore';
import { useDeleteFeed } from '@/app/lib/feed/hook/useDeleteFeed';

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

  const { mutate, isPending: isLoading } = useDeleteFeed();

  const onClick = () => {
    if (name === 'edit_profile') {
      router.push(`/user/edit`);
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
