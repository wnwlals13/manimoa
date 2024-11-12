import React from 'react';

interface ITextAreaProps {
  id: string;
  placeholderText?: string;
}

const CustomTextArea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ placeholderText, id, ...props }, ref) => {
    return (
      <textarea
        id={id}
        placeholder={placeholderText}
        className="min-h-44 h-44 resize-none w-full p-2 focus:outline-none"
        ref={ref}
        {...props}
      ></textarea>
    );
  },
);
CustomTextArea.displayName = 'CustomTextArea';

export default CustomTextArea;
