import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface FormTypes<T = any> {
  initialValues: T;
  validate: (values: T) => { [value in keyof T]: string };
  onSubmit: (values: T) => void;
}

type ErrorsState<U> = {
  [name in keyof U]: string;
};

type TouchedState<U> = {
  [field in keyof U]: boolean;
};

export default function useForm<T>({
  initialValues,
  validate,
  onSubmit,
}: FormTypes<T>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ErrorsState<T>>({} as ErrorsState<T>);
  const [touched, setTouched] = useState<TouchedState<T>>(
    {} as TouchedState<T>
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setTouched({
      ...(touched as TouchedState<T>),
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setTouched(
      Object.getOwnPropertyNames(values).reduce((touched, field) => {
        touched[field as keyof T] = true;
        return touched;
      }, {} as TouchedState<T>)
    );

    const errors = runValidator();
    // 오류 메세지 상태를 갱신한다
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    onSubmit(values);
  };

  const runValidator = useCallback(() => validate(values), [values, validate]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
