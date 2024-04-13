export default function EmailFailure() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-screen max-w-xl mx-auto">
        <div className="w-full h-full pt-20 bg-white rounded-lg">
          <p className="m-auto text-base font-bold text-center sm:text-lg">
            인증이 만료되었거나 잘못된 요청입니다.
          </p>
          <p className="m-auto text-base font-bold text-center sm:text-lg">
            인증을 다시 시도해 주세요.
          </p>
          <p className="m-auto text-center">현재 페이지는 닫아 주세요.</p>
        </div>
      </div>
    </div>
  );
}
