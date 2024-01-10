import useForm from '@/hooks/useForm';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';
import { verifyEmailAuthForPwd } from '@/api/account/resetPwd';
import axios from 'axios';
import Alert from '../modal/Alert';
import { useState } from 'react';

type FindPasswordFormType = {
  email: string;
};

export default function FindPasswordForm() {
  const [openAlert, setOpenAlert] = useState<{
    state: boolean;
    title?: string;
    content: string;
  }>({ state: false, title: '', content: '' });
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useForm<FindPasswordFormType>({
      initialValues: {
        email: '',
      },
      validate: (values) => {
        const errors = {
          email: '',
        };

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!values.email) {
          errors.email = '이메일을 입력해 주세요';
        }

        const isValidEmail = emailRegex.test(values.email);
        if (values.email && !isValidEmail) {
          errors.email = '이메일 형식으로 입력해 주세요';
        }

        return errors;
      },
      async onSubmit(values) {
        try {
          setSubmitLoading(true);
          const { data } = await verifyEmailAuthForPwd(values);
          if (data.status === 200) {
            setOpenAlert({
              state: true,
              content: '비밀번호 재설정 메일을 전송하였습니다.',
            });
          }
        } catch (error) {
          if (axios.isAxiosError<{ message: string }>(error)) {
            setOpenAlert({
              state: true,
              title: '실패',
              content: `${error.response?.data.message}`,
            });
          }
        } finally {
          setSubmitLoading(false);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-3">
        <p className="text-lg font-bold text-center">비밀번호 찾기</p>
      </div>
      <div className="p-3">
        <p className="font-semibold text-center">
          가입하신 이메일을 입력해 주세요.
        </p>
        <p className="font-semibold text-center">
          비밀번호 재설정 안내 이메일을 보내드립니다.
        </p>
      </div>
      <div className="relative my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={values.email}
          error={touched?.email && errors?.email}
          required
        />
        <ErrorMsg name="email" errors={errors.email} touched={touched.email} />
      </div>
      <Button
        disabled={submitLoading}
        type="submit"
        style={{ marginTop: '1.5rem' }}
      >
        이메일 보내기
      </Button>
      {openAlert.state && (
        <Alert
          visible={openAlert.state}
          onClose={() => setOpenAlert({ state: false, title: '', content: '' })}
          title={openAlert.title}
          content={openAlert.content}
        />
      )}
    </form>
  );
}
