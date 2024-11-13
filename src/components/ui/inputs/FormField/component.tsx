import React from 'react';
import { Input, VariantType } from '../input';

interface IFormFieldProps {
  fieldType: string;
  placeholderText?: string;
  labelName?: string;
  labelText?: string;
  variant?: VariantType;
  errorMsg?: string | null;
  onFieldChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = React.forwardRef<HTMLInputElement, IFormFieldProps>(
  (
    {
      fieldType,
      placeholderText,
      labelName,
      labelText,
      variant,
      errorMsg,
      onFieldChange,
    },
    ref,
  ) => {
    const renderField = () => {
      switch (fieldType) {
        case 'password':
          return (
            <>
              {labelName && (
                <label className="text-md" htmlFor={labelName}>
                  {labelText}
                </label>
              )}
              <Input
                type="password"
                variant={variant}
                placeholderText={placeholderText}
                handlechange={onFieldChange}
                ref={ref}
              />
            </>
          );
        case 'text':
          return (
            <>
              {labelName && (
                <label className="text-md" htmlFor={labelName}>
                  {labelText}
                </label>
              )}
              <Input
                type="text"
                variant={variant}
                placeholderText={placeholderText}
                handlechange={onFieldChange}
                ref={ref}
              />
            </>
          );
        case 'number':
          return (
            <Input
              type="number"
              variant={variant}
              placeholderText={placeholderText}
              handlechange={onFieldChange}
              ref={ref}
            />
          );
      }
    };
    return (
      <div className="w-full">
        {renderField()}
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      </div>
    );
  },
);
FormField.displayName = 'FormField';

export default FormField;
