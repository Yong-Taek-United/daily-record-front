import LoginForm from '@/components/login/LoginForm';
import { useState } from 'react';

export default function LoginPage() {
  const [tabIndex, setTabIndex] = useState<number>(1);
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex w-96 justify-between">
        <button onClick={() => setTabIndex(1)}>로그인</button>
        <button onClick={() => setTabIndex(2)}>회원가입</button>
      </div>
      <div>{tabIndex === 1 ? <LoginForm /> : null}</div>
    </main>
  );
}
