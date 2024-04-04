import LoginForm from '@/components/account/LoginForm';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto pt-16 px-3">
        <div className="flex w-full rounded-t-lg bg-gray-100">
          <button
            className="bg-white p-3 flex-1 rounded-t-lg font-bold text-lg"
            onClick={() =>
              router.push({ pathname: '/account/login' }, undefined, {
                shallow: true,
              })
            }
          >
            로그인
          </button>
          <button
            className="p-3 flex-1 rounded-t-lg font-semibold text-lg text-gray-400"
            onClick={() =>
              router.push({ pathname: '/account/sign-up' }, undefined, {
                shallow: true,
              })
            }
          >
            회원가입
          </button>
        </div>
        <div className="bg-white px-5 pb-5 pt-4 rounded-b-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
