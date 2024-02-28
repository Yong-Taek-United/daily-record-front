import { getUserInfo, updateUserIntroduce } from '@/api/account/user';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useForm from '@/hooks/useForm';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';
type IntroFromTypes = {
  introduce: string;
};

export default function ProfileIntroItem() {
  const { data, isLoading } = useSWR('getUserInfo', getUserInfo);
  const [isEdit, setIsEdit] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useForm<IntroFromTypes>({
      initialValues: { introduce: data?.data.data.userProfile.introduce || '' },
      validate: (values) => {
        const errors = {
          introduce: '',
        };

        if (!values.introduce) {
          errors.introduce = '한 줄 소개를 적어 주세요.';
        }

        return errors;
      },
      async onSubmit(values) {
        try {
          setSubmitLoading(true);
          const { status } = await updateUserIntroduce(values);
          if (status === 200) {
            mutate('getUserInfo');
            setIsEdit(false);
          }
        } catch (error) {
        } finally {
          setSubmitLoading(false);
        }
      },
    });
  if (isEdit) {
    return (
      <form
        onSubmit={handleSubmit}
        className="h-[110px] px-4 py-3  bg-white rounded-lg"
      >
        <div className="text-sm text-gray-500">한 줄 소개</div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex-1 mr-3">
            <Input
              className="w-full"
              maxLength={99}
              onChange={handleChange}
              onBlur={handleBlur}
              name="introduce"
              label=""
              placeholder="한 줄 소개를 적어 주세요."
              value={values.introduce}
              error={touched?.introduce && errors?.introduce}
            />
          </div>

          <div className="flex justify-start">
            <Button
              disabled={submitLoading}
              type="submit"
              style={{ width: 50, fontSize: 15, marginRight: 5 }}
            >
              저장
            </Button>
            <Button
              onClick={() => setIsEdit(false)}
              style={{
                width: 50,
                fontSize: 15,

                backgroundColor: '#DCDCDC',
                color: '#5B5B5B',
              }}
            >
              취소
            </Button>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <div className="h-[110px] px-4 py-3  bg-white rounded-lg">
        <div className="text-sm text-gray-500">한 줄 소개</div>
        <div className="flex items-center justify-between mt-1">
          <div>
            {isLoading ? (
              <div className="h-5 bg-gray-200 rounded-md w-44 animate-pulse"></div>
            ) : data?.data.data.userProfile.introduce ? (
              <p className="font-medium">
                {data?.data.data.userProfile.introduce}
              </p>
            ) : (
              <p className="text-gray-400">한 줄 소개가 없습니다.</p>
            )}
          </div>
          <div>
            <Button
              disabled={submitLoading}
              onClick={() => setIsEdit(true)}
              style={{ width: 50, fontSize: 15 }}
            >
              변경
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
