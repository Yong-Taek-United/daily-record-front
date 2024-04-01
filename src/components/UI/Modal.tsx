import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface ModalProps {
  children?: ReactNode;
  onClose: () => void;
  visible: boolean;
}

export default function Modal({ children, onClose, visible }: ModalProps) {
  if (!visible) return null;
  return ReactDOM.createPortal(
    <>
      <div
        id="overlay"
        onClick={onClose}
        className="fixed inset-0 z-30 w-full h-full bg-black/60"
      ></div>
      <div className="fixed z-40 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-zoomIn">
        {children}
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
}
