import React from 'react';
import { twMerge } from 'tailwind-merge';

interface PropsType extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
}

const AccordionIcon = ({ isOpen, ...props }: PropsType) => {
  return (
    <div className={`w-6 h-6 ${twMerge(props.className)}`}>
      <div
        className={`inset-0 w-full h-full transform transition-transform duration-300 ${
          isOpen ? '' : 'rotate-180'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-full h-full text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>
    </div>
  );
};

export default AccordionIcon;
