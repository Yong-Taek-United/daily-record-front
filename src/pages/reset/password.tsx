// import ResetPasswordForm from '@/components/account/ResetPasswordForm';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ResetPasswordForm = dynamic(
  () => import('@/components/account/ResetPasswordForm'),
  { ssr: false }
);

type QueryTypes = {
  emailToken: string;
  emailLogId: string;
};

export default function ResetPassword() {
  const CSR = typeof window;
  const router = useRouter();
  const { emailLogId, emailToken } = router.query as QueryTypes;
  // const [query, setQuery] = useState<QueryTypes>();
  useEffect(() => {
    if (!CSR) return;

    // setQuery({ emailLogId: emailLogId, emailToken: emailToken });
  }, [router, CSR]);

  if (!CSR) return;

  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-gray-50">
      <div className="px-5 pt-4 pb-5 bg-white rounded-lg">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
