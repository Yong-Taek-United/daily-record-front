import { useEffect } from 'react';

export default function EmailSuccess() {
  useEffect(() => {
    alert('이메일 인증되었습니다.');
  }, []);
  return <div></div>;
}
