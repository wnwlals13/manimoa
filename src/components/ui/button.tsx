import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ReactNode } from 'react';

const buttonStyles = cva('p-2 rounded-md', {
  variants: {
    intent: {
      default: 'w-full bg-black text-white',
      outline: 'border',
    },
  },
});

type intentType = 'default' | 'outline';
type buttonType = 'button' | 'submit' | 'reset';

export function ButtonComponent({
  intent = 'default',
  type = 'button',
  disabled = false,
  children,
}: {
  intent: intentType;
  type: buttonType;
  disabled?: boolean;
  children: string;
}) {
  return (
    <button
      className={buttonStyles({ intent })}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function IconButtonComponent({
  intent,
  title,
  children,
}: {
  intent: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        `flex items-center p-1 pl-3 pr-3 rounded-2xl text-white`,
        intent === 'main' ? 'bg-main' : 'bg-subMain',
      )}
    >
      {children}
      <div className="ml-1">{title}</div>
    </button>
  );
}
