import { instance } from '../instance';

export function login(data: { email: string; password: string }) {
  return instance.post('/auth/login', { ...data });
}
