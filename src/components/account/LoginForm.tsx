import useForm from '@/hooks/useForm';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';
import { login } from '@/api/account/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Alert from '../modal/Alert';
import axios from 'axios';
import { saveDataInLocalStorage } from '@/utils/utils';
import { SaveUserInfoTypes } from '@/types/user';

export type LoginFormTypes = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<{
    state: boolean;
    title?: string;
    content: string;
    handleAlertConfirmation?: () => void;
    handleCloseAlert?: () => void;
  }>({ state: false, title: '', content: '' });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useForm<LoginFormTypes>({
      initialValues: { email: '', password: '' },
      validate: (values) => {
        const errors = {
          email: '',
          password: '',
        };

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!values.email) {
          errors.email = '이메일을 입력해 주세요';
        }

        const isValidEmail = emailRegex.test(values.email);
        if (values.email && !isValidEmail) {
          errors.email = '이메일 형식으로 입력해 주세요';
        }

        if (!values.password) {
          errors.password = '비밀번호를 입력하세요';
        }

        return errors;
      },
      async onSubmit(values) {
        // 로그인 로직입니다.
        try {
          setSubmitLoading(true);
          const { data, status } = await login(values);
          const user: SaveUserInfoTypes = {
            nickname: data?.data?.nickname,
            userFile: data?.data?.userFile[0],
          };

          if (status === 200) {
            saveDataInLocalStorage('user', user);
            router.push('/main');
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
      <div className="my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={values.email}
          error={touched?.email && errors?.email}
          className="w-full"
          required
        />
        <ErrorMsg name="email" errors={errors.email} touched={touched.email} />
      </div>
      <div className="my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={values.password}
          error={touched?.password && errors?.password}
          required
          className="w-full"
        />
        <ErrorMsg
          name="password"
          errors={errors.password}
          touched={touched.password}
        />
      </div>
      <div>
        <p
          onClick={() => router.push('/account/find-password')}
          className="text-base font-semibold text-right text-gray-500 cursor-pointer"
        >
          비밀번호 찾기
        </p>
      </div>

      <Button
        disabled={submitLoading}
        type="submit"
        style={{ marginTop: '1.5rem' }}
        className="w-full"
      >
        로그인
      </Button>
      {openAlert.state && (
        <Alert
          visible={openAlert.state}
          onClose={() => setOpenAlert({ state: false, title: '', content: '' })}
          title={openAlert.title}
          content={openAlert.content}
          handleAlertConfirmation={openAlert.handleAlertConfirmation}
          handleCloseAlert={openAlert.handleCloseAlert}
        />
      )}
    </form>
  );
}
