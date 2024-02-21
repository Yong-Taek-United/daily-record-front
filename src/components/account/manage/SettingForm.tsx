import { getUserInfo } from '@/api/account/user';
import ProfileImg from '@/components/UI/ProfileImg';
import { UserInfoField } from '@/components/UI/UserInfoField';
import useSWR from 'swr';
export default function SettingForm() {
  const { data, isLoading } = useSWR('getUserInfo', getUserInfo);

  return (
    <div className="flex flex-col items-center justify-center px-5 pt-4 pb-5 rounded-lg ">
      <div className="flex justify-center my-5">
        <ProfileImg onClick={() => null} height={88} width={88} />
      </div>

      <div className="w-full sm:px-14">
        <UserInfoField
          label="이름"
          isLoading={isLoading}
          value={data?.data.data.username}
        />
        <UserInfoField
          label="계정"
          isLoading={isLoading}
          value={String(data?.data.data.id)}
        />
        <UserInfoField
          label="이메일"
          isLoading={isLoading}
          value={data?.data.data.email}
          isAuth={data?.data.data.isEmailVerified}
        />
        <UserInfoField
          label="휴대폰 번호"
          isLoading={isLoading}
          value={data?.data.data.userProfile.phone}
          isAuth={data?.data.data.isPhoneVerified}
        />

        <div className="flex items-center justify-start my-2">
          <p className="font-semibold text-gray-500 w-28">비밀번호</p>

          {!isLoading ? (
            <p className="font-normal text-gray-400">
              {'최근 업데이트 : '}
              {data?.data.data.passwordChangedAt
                ? data.data.data.passwordChangedAt
                : '없음'}
            </p>
          ) : (
            <div className="h-5 bg-gray-200 rounded-md w-36 animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
}