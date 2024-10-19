import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';

const inputStyles = cva('border rounded-md p-2 w-full', {
  variants: {
    size: {
      medium: 'text-base h-10',
    },
    state: {
      default: 'border-gray-300',
      error: 'border-red-300',
    },
  },
  defaultVariants: {
    size: 'medium',
    state: 'default',
  },
});

type InputSize = 'medium';
type InputState = 'default' | 'error';
interface InputComponentProps {
  size: InputSize;
  state: InputState;
  type?: string;
  placeholderText: string;
}

export const InputComponent = forwardRef(function InputComponent(
  { size, state, placeholderText, type = 'text', ...rest }: InputComponentProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      type={type}
      ref={ref}
      maxLength={50}
      className={inputStyles({ size, state })}
      placeholder={placeholderText}
      {...rest}
    />
  );
});
