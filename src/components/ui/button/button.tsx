import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/util/utils';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageCircle, FiPlus, FiSend } from 'react-icons/fi';

export type BtnVariantType = 'primary' | 'secondary' | 'outline' | 'none';
export type BtnSizeType = 'sm' | 'md' | 'lg' | 'full';
export type IconType =
  | 'like'
  | 'unlike'
  | 'comment'
  | 'message'
  | 'plus'
  | undefined;

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-main text-main-foreground shadow',
        accent: 'bg-submain text-submain-foreground shadow',
        none: 'text-primary p-0',
      },
      size: {
        sm: 'h-8 rounded-md px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 rounded-md px-8',
        full: 'w-full px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  isIcon?: boolean;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  iconColor?: 'black' | 'white';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className,
      variant,
      size,
      children,
      isIcon = false,
      icon,
      iconColor,
      iconPosition = 'left',
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
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isIcon && iconPosition === 'left' ? renderIcon(icon) : ''}
        {children}
        {isIcon && iconPosition === 'right' ? renderIcon(icon) : ''}
      </button>
    );
  },
);
Button.displayName = 'Button';
Button.propTypes = {};

export { Button, buttonVariants };
