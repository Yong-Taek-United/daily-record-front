import { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: CSSProperties;
}
export default function Button({ children, style, ...props }: ButtonTypes) {
  return (
    <button
      {...props}
      className="bg-black text-white font-bold text-lg rounded-md w-96 h-10"
      style={{ ...style }}
    >
      {children}
    </button>
  );
}
