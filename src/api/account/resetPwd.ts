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

export async function changePassword({
  emailToken,
  emailLogId,
  newPassword,
}: {
  emailToken: string;
  emailLogId: number;
  newPassword: string;
}) {
  try {
    const { status, data } = await instance.patch('/users/password/reset', {
      emailToken,
      emailLogId,
      newPassword,
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
