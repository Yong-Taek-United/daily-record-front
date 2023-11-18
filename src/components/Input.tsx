import { CSSProperties, ChangeEvent, HTMLInputTypeAttribute } from 'react';

type InputPropsTypes = {
  style?: CSSProperties;
  type?: HTMLInputTypeAttribute;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
  required?: boolean;
  value?: string;
};

export default function Input({
  style,
  type = 'text',
  onChange,
  name,
  placeholder,
  label,
  required = false,
  value,
}: InputPropsTypes) {
  return (
    <div>
      <div className="flex ">
        <label
          className="font-bold"
          style={{ fontSize: 12, lineHeight: 2 }}
          htmlFor={name}
        >
          {label}
        </label>
        {required && (
          <div className="ml-1">
            <span className="text-red-600 text-xs">*</span>
          </div>
        )}
      </div>
      <input
        id={name}
        name={name}
        className="p-2 border rounded-md text-xs mb-3"
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        style={{
          ...style,
          minWidth: 268,
          minHeight: 32,
          borderColor: '#b2b2b2',
        }}
        required={required}
        value={value}
      />
    </div>
  );
}
