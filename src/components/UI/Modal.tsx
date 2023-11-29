import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  children?: ReactNode;
  onClose: () => void;
  visible: boolean;
};

export default function Modal({ children, onClose, visible }: ModalProps) {
  if (!visible) return null;
  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed bg-black top-0 min-h-screen min-w-full opacity-50"
      ></div>
      <div className="">{children}</div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
}
