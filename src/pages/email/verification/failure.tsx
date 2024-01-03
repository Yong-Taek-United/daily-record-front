import { useEffect } from 'react';

export default function EmailFailure() {
  useEffect(() => {
    alert('이메일 인증 실패하였습니다.');
  }, []);
  return <div></div>;
}
