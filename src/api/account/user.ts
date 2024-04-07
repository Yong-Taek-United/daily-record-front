import { UserDataType } from '@/types/user';
import { AxiosResponse } from 'axios';
import { instanceSSR } from '../authInterceptorWithSSR';

/** 회원 정보 조회 */
export function getUserInfo(): Promise<
  AxiosResponse<{ data: UserDataType }, any>
> {
  return instanceSSR.get('/users/info');
}

/** 회원 프로필 한 줄 소개 변경 */
export function updateUserIntroduce({ introduce }: { introduce: string }) {
  return instanceSSR.patch('/users/profile', { introduce });
}
