import {
  CSSProperties,
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';

interface InputPropsTypes extends InputHTMLAttributes<HTMLInputElement> {
  style?: CSSProperties;
  type?: HTMLInputTypeAttribute;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  value?: string;
  error?: any;
}

export default function Input({
  style,
  type = 'text',
  onChange,
  name,
  placeholder,
  label,
  required = false,
  value,
  error,
  ...props
}: InputPropsTypes) {
  return (
    <div className="mt-2">
      <div className="flex ">
        <label className="font-bold text-sm" htmlFor={name}>
          {label}
        </label>
        {required && (
          <div className="ml-1">
            <span className="text-red-600 text-sm">*</span>
          </div>
        )}
      </div>
      <input
        {...props}
        id={name}
        name={name}
        className={`p-2 rounded-md text-sm border w-96 h-10
        ${error ? 'border-red-500' : 'border-[#b2b2b2]'}`}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        style={{ ...style }}
        value={value}
      />
    </div>
  );
}
