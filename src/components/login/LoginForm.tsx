import useForm from '@/hooks/useForm';
import Input from '../Input';
import ErrorMsg from '../ErrorMsg';
import Button from '../Button';
import { login } from '@/api/account/login';
import { useRouter } from 'next/router';

export type LoginFormTypes = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
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
          const res = await login(values);
          console.log(res);
          // router.push('/');
        } catch (error) {
          console.log(error);
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
        />
        <ErrorMsg
          name="password"
          errors={errors.password}
          touched={touched.password}
        />
      </div>

      <Button type="submit" style={{ marginTop: '1.5rem' }}>
        로그인
      </Button>
    </form>
  );
}
