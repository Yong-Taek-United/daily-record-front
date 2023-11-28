import { instance } from '../instance';

export function signUp(data: {
  email: string;
  nickname: string;
  password: string;
}) {
  return instance.post('/users/sign-up', { ...data, authType: 'BASIC' });
}

export async function sendVerification({ email }: { email: string }) {
  try {
    const { status, data } = await instance.post('/emails/email-verification', {
      email,
      emailType: 'VERIFICATION',
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

export async function verifyEmailAuth({ email }: { email: string }) {
  try {
    const { status, data } = await instance.post(
      '/emails/email-verification/check',
      {
        email,
        emailType: 'VERIFICATION',
      }
    );
    if (status === 200) {
      return { data: { data, status } };
    } else {
      throw { error: { data, status } };
    }
  } catch (error) {
    throw error;
  }
}
