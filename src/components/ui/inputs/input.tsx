import * as React from 'react';

import { cn } from '@/util/utils';
import { cva } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-9 w-full rounded-md border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border',
        error: 'border border-red-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type VariantType = 'default' | 'error';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantType;
  placeholderText?: string;
  handlechange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant = 'default',
      placeholderText = '',
      handlechange,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        placeholder={placeholderText}
        onChange={handlechange}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
