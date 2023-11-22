import useForm from '@/hooks/useForm';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';
import { useRouter } from 'next/router';

export type SignUpFormTypes = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const router = useRouter();
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

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const pwdRegex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

        if (!values.email) {
          errors.email = '이메일을 입력해 주세요';
        }

        const isValidEmail = emailRegex.test(values.email);
        if (values.email && !isValidEmail) {
          errors.email = '이메일 형식으로 입력해 주세요';
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
        return;
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
          required
        />
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
    </form>
  );
}
