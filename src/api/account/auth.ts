import { AxiosResponse } from 'axios';
import { instance } from '../instance';
import { UserDataType } from '@/types/user';

export function login(data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ data: UserDataType }, any>> {
  return instance.post('/auth/login', { ...data });
}

export function logout() {
  return instance.post('/auth/logout');
}
