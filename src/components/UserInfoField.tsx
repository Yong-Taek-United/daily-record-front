import { SvgCheck } from '@/utils/images';

type UserInfoFieldProps = {
  label: string;
  value?: string;
  isAuth?: boolean;
  isLoading: boolean;
};

export const UserInfoField = ({
  label,
  value,
  isAuth,
  isLoading,
}: UserInfoFieldProps) => (
  <div className="flex items-center justify-start mx-auto my-2">
    <p className="font-semibold text-gray-500 w-28">{label}</p>

    {!isLoading ? (
      <p className="font-semibold">{value}</p>
    ) : (
      <div className="h-5 bg-gray-200 rounded-md w-36 animate-pulse"></div>
    )}

    {isAuth ? (
      <div className="hidden ml-1 xs:flex">
        <SvgCheck className="my-auto mr-1" />
        <p className="text-sm text-green-500">인증 완료</p>
      </div>
    ) : null}
  </div>
);
