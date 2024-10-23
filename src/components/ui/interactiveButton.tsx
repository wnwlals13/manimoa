'use client';

import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from './button';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { VariantProps } from 'class-variance-authority';

interface InteractiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: 'default' | 'outline' | 'main' | 'submain';
  size?: 'default' | 'full';
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
  const onClick = () => {
    if (name === 'edit_profile') {
      router.push(`/user/edit`);
    } else if (name === 'logout') {
      logout();
      router.push('/login');
    } else if (name === 'add_feed') {
      router.push('/feed/add-new');
    }
  };
  return (
    <Button variant={variant} size={size} onClick={onClick} {...props}>
      {children}
    </Button>
  );
}
