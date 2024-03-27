import {
  CSSProperties,
  ChangeEventHandler,
  TextareaHTMLAttributes,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface TextareaPropsTypes
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  style?: CSSProperties;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  value?: string;
  error?: any;
}

export default function Textarea({
  style,
  onChange,
  name,
  placeholder,
  label,
  required = false,
  value,
  error,
  ...props
}: TextareaPropsTypes) {
  return (
    <div className="">
      <div className="flex ">
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
        </label>
        {required && (
          <div className="ml-1">
            <span className="text-sm text-red-600">*</span>
          </div>
        )}
      </div>
      <textarea
        {...props}
        id={name}
        name={name}
        className={twMerge(
          `p-2 rounded-md text-sm border w-96 h-10
        ${error ? 'border-red-500' : 'border-[#b2b2b2]'}`,
          `${props.className}`
        )}
        onChange={onChange}
        placeholder={placeholder}
        style={{ ...style }}
        value={value}
      />
    </div>
  );
}
