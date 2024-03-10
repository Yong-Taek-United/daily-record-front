import { instance } from '@/api/instance';
import { UserDataType } from '@/types/user';
import { AxiosResponse } from 'axios';

/** 회원 정보 조회 */
export function getUserInfo(): Promise<
  AxiosResponse<{ data: UserDataType }, any>
> {
  return instance.get('/users/info');
}

/** 회원 프로필 한 줄 소개 변경 */
export function updateUserIntroduce({ introduce }: { introduce: string }) {
  return instance.patch('/users/profile', { introduce });
}
