import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle, FiPlus, FiSend } from 'react-icons/fi';
import { cn } from '@/util/utils';

export type IconType =
  | 'like'
  | 'unlike'
  | 'comment'
  | 'message'
  | 'plus'
  | undefined;

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  iconColor?: 'black' | 'white';
  children?: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant,
      size,
      icon,
      iconColor,
      iconPosition = 'left',
      children,
      ...props
    },
    ref,
  ) => {
    const renderIcon = (icon: IconType) => {
      if (icon === 'like') return <AiFillHeart color="red" />;
      else if (icon === 'unlike') return <AiOutlineHeart />;
      else if (icon === 'comment') return <FiMessageCircle />;
      else if (icon === 'message') return <FiSend />;
      else if (icon === 'plus') return <FiPlus color={iconColor} size="25" />;
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size }))}
        type="button"
        ref={ref}
        {...props}
      >
        {iconPosition === 'left' && renderIcon(icon)}
        {children}
        {iconPosition === 'right' && renderIcon(icon)}
      </button>
    );
  },
);
IconButton.displayName = 'IconButton';

export { IconButton };
