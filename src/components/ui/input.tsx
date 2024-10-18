import { cva } from 'class-variance-authority';

const inputStyles = cva('border rounded-md p-2 w-full', {
  variants: {
    size: {
      medium: 'text-base h-10',
    },
    state: {
      default: 'border-gray-300',
    },
  },
  defaultVariants: {
    size: 'medium',
    state: 'default',
  },
});

type InputSize = 'medium';
type InputState = 'default';

export function InputComponent({
  size,
  state,
  placeholderText,
  handleChange,
}: {
  size: InputSize;
  state: InputState;
  placeholderText: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className={inputStyles({ size, state })}
      placeholder={placeholderText}
      onChange={handleChange}
    />
  );
}
