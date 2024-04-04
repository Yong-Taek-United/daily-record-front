import FindPasswordForm from '@/components/account/FindPasswordForm';

export default function findPassword() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto pt-16 px-3">
        <div className="px-5 pt-4 pb-5 bg-white rounded-lg">
          <FindPasswordForm />
        </div>
      </div>
    </div>
  );
}
