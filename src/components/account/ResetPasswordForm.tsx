import { useRouter } from 'next/router';
import ErrorMsg from '../ErrorMsg';
import Input from '../Input';
import useForm from '@/hooks/useForm';
import Button from '../Button';
import { changePassword } from '@/api/account/resetPwd';
import axios from 'axios';
import { useState } from 'react';
import Alert from '../modal/Alert';

type ResetPasswordFormType = {
  newPassword: string;
  confirmPassword: string;
};

type QueryTypes = {
  emailToken: string;
  emailLogId: string;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const { emailLogId, emailToken } = router.query as QueryTypes;
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<{
    state: boolean;
    title?: string;
    content: string;
    handleAlertConfirmation?: () => void;
    handleCloseAlert?: () => void;
  }>({ state: false, title: '', content: '' });
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useForm<ResetPasswordFormType>({
      initialValues: { newPassword: '', confirmPassword: '' },
      validate: (values) => {
        const errors = {
          newPassword: '',
          confirmPassword: '',
        };

        const pwdRegex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

        if (!values.newPassword) {
          errors.newPassword = '새로운 비밀번호를 입력하세요';
        }

        const isValidPwd = pwdRegex.test(values.newPassword);
        if (values.newPassword && !isValidPwd) {
          errors.newPassword =
            '영문자, 숫자, 특수문자 포함 최소 8~20자 형식으로 입력하세요';
        }

        if (!values.confirmPassword) {
          errors.confirmPassword = '비밀번호 확인을 입력하세요';
        }

        if (values.newPassword && values.confirmPassword) {
          if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다';
          }
        }

        return errors;
      },
      async onSubmit(values) {
        const formData = {
          ...values,
          emailLogId: Number(emailLogId),
          emailToken,
        };
        try {
          setSubmitLoading(true);
          const { data } = await changePassword(formData);
          if (data.status === 200) {
            setOpenAlert({
              state: true,
              content: '비밀번호 재설정을 완료하였습니다.',
              handleAlertConfirmation: () => router.push('/account/login'),
              handleCloseAlert: () => router.push('/account/login'),
            });
          }
        } catch (error) {
          if (axios.isAxiosError<{ message: string }>(error)) {
            setOpenAlert({
              state: true,
              content: `${error.response?.data.message}`,
              title: '실패',
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
          새롭게 설정할 비밀번호를 입력해 주세요.
        </p>
      </div>
      <div className="my-5">
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="newPassword"
          label="새로운 비밀번호"
          type="password"
          placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자"
          value={values.newPassword}
          error={touched?.newPassword && errors?.newPassword}
          required
        />
        <ErrorMsg
          name="password"
          errors={errors.newPassword}
          touched={touched.newPassword}
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
      <Button
        disabled={submitLoading}
        type="submit"
        style={{ marginTop: '1.5rem' }}
      >
        비밀번호 재설정
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
