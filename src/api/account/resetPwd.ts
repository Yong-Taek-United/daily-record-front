import { instance } from '../instance';

export async function verifyEmailAuthForPwd({ email }: { email: string }) {
  try {
    const { status, data } = await instance.post('/emails/reset-password', {
      email,
      emailType: 'PASSWORD',
    });
    if (status === 200) {
      return { data: { data, status } };
    } else {
      throw { error: { data, status } };
    }
  } catch (error) {
    throw error;
  }
}
