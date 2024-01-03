import useForm from '@/hooks/useForm';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';
import {
  sendVerification,
  signUp,
  verifyEmailAuth,
} from '@/api/account/signUp';
import { useEffect, useState } from 'react';
import Alert from '../modal/Alert';
import useSWR from 'swr';
import SvgCheck from '../../../public/images/authCheckImg.svg';
import axios from 'axios';

export type SignUpFormTypes = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const checkEmailFetcher = async (email: string) => {
    try {
      const { data } = await verifyEmailAuth({ email: values.email });
      if (data) return data;
    } catch (error) {
      throw error;
    }
  };
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [sendAuth, setSendAuth] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<{
    state: boolean;
    title?: string;
    content: string;
  }>({ state: false, title: '', content: '' });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkEmail = useSWR(
    sendAuth && !isChecked ? '/emails/email-verification/check' : null,
    checkEmailFetcher
  );

  console.log('인증??? ', checkEmail.data, '에러러러??', checkEmail.error);
  useEffect(() => {
    if (checkEmail.data?.status === 200) {
      setIsChecked(true);
    }
  }, [checkEmail.data]);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useForm<SignUpFormTypes>({
      initialValues: {
        email: '',
        nickname: '',
        password: '',
        confirmPassword: '',
      },
      validate: (values) => {
        const errors = {
          email: '',
          nickname: '',
          password: '',
          confirmPassword: '',
        };

        const pwdRegex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

        if (!values.email) {
          errors.email = '이메일을 입력해 주세요';
        }

        const isValidEmail = emailRegex.test(values.email);
        if (values.email && !isValidEmail) {
          errors.email = '이메일 형식으로 입력해 주세요';
        }

        if (!isChecked) {
          errors.email = '이메일을 인증해 주세요';
        }

        if (!values.nickname) {
          errors.nickname = '이름을 입력하세요';
        }

        if (!values.password) {
          errors.password = '비밀번호를 입력하세요';
        }
        const isValidPwd = pwdRegex.test(values.password);
        if (values.password && !isValidPwd) {
          errors.password =
            '영문자, 숫자, 특수문자 포함 최소 8~20자 형식으로 입력하세요';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = '비밀번호 확인을 입력하세요';
        }
        if (values.password && values.confirmPassword) {
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다';
          }
        }

        return errors;
      },
      async onSubmit(values) {
        try {
          const res = await signUp({
            email: values.email,
            nickname: values.nickname,
            password: values.password,
          });
          if (res.status === 201) {
            setOpenAlert({
              state: true,
              title: '알림',
              content: '계정이 생성되었습니다.',
            });
            clearErrors();
            clearForm();
          }
        } catch (error) {
          if (axios.isAxiosError<{ message: string }>(error)) {
            setOpenAlert({
              state: true,
              title: '실패',
              content: `${error.response?.data.message}`,
            });
          }
        }
      },
    });

  const handleSendVerificationMail = async () => {
    const isValidEmail = emailRegex.test(values.email);
    if (!values.email || !isValidEmail) {
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await sendVerification({ email: values.email });
      if (data) {
        // 성공 처리하기
        setSendAuth(true);
        setOpenAlert({
          state: true,
          content: '인증 메일을 전송하였습니다.',
          title: '알림',
        });
      }
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        // 에러 처리
        setOpenAlert({
          state: true,
          content: `${error.response?.data.message}`,
          title: '실패',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    errors.confirmPassword = '';
    errors.email = '';
    errors.nickname = '';
    errors.password = '';
  };
  const clearForm = () => {
    values.email = '';
    values.nickname = '';
    values.password = '';
    values.confirmPassword = '';
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {!isChecked ? (
          <div
            onClick={handleSendVerificationMail}
            className="absolute text-sm text-blue-500 cursor-pointer right-3 hover:underline decoration-1 decoration-blue-700 "
            style={{ top: 33 }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600 border-r-blue-600" />
            ) : sendAuth ? (
              '다시 보내기'
            ) : (
              '이메일 인증'
            )}
          </div>
        ) : (
          <div className="absolute flex right-3" style={{ top: 33 }}>
            <SvgCheck className="my-auto mr-1" />
            <p className="text-sm text-green-500">인증 완료</p>
          </div>
        )}

        <ErrorMsg name="email" errors={errors.email} touched={touched.email} />
      </div>
      <div className="my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="nickname"
          label="이름"
          placeholder="이름을 입력해 주세요"
          value={values.nickname}
          error={touched?.nickname && errors?.nickname}
          required
        />
        <ErrorMsg
          name="nickname"
          errors={errors.nickname}
          touched={touched.nickname}
        />
      </div>
      <div className="my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          label="비밀번호"
          type="password"
          placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자"
          value={values.password}
          error={touched?.password && errors?.password}
          required
        />
        <ErrorMsg
          name="password"
          errors={errors.password}
          touched={touched.password}
        />
      </div>
      <div className="my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요"
          value={values.confirmPassword}
          error={touched?.confirmPassword && errors?.confirmPassword}
          required
        />
        <ErrorMsg
          name="confirmPassword"
          errors={errors.confirmPassword}
          touched={touched.confirmPassword}
        />
      </div>

      <Button type="submit" style={{ marginTop: '1.5rem' }}>
        작성 완료하고 가입하기
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
