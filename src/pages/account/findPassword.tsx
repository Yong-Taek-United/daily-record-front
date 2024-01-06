import FindPasswordForm from '@/components/account/FindPasswordForm';

export default function findPassword() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24 bg-gray-50">
      <div className="px-5 pt-4 pb-5 bg-white rounded-lg">
        <FindPasswordForm />
      </div>
    </main>
  );
}
