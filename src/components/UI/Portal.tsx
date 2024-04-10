import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  children?: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  return ReactDOM.createPortal(
    <>
      <>{children}</>
    </>,
    document.getElementById('portal') as HTMLElement
  );
}
