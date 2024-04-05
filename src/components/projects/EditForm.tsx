import useForm from '@/hooks/useForm';
import ErrorMsg from '../ErrorMsg';
import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';
import { useState } from 'react';
import { createProject, updateProject } from '@/api/projects/projects';
import axios from 'axios';
import { useRouter } from 'next/router';
import Alert from '../modal/Alert';

type ProjectFormTypes = {
  title: string;
  description: string;
  startedAt: string;
  finishedAt: string;
};

type ProjectEditFormProps = ProjectFormTypes & {
  isActive: boolean;
  isUpdate?: boolean;
  projectId?: number;
};

// 현재 연도, 월, 일을 가져오는 함수
const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;
const DATE = new Date().getDate();

const TODAY = `${YEAR}-${MONTH < 10 ? `0${MONTH}` : MONTH}-${
  DATE < 10 ? `0${DATE}` : DATE
}`;

export default function ProjectEditForm({
  isActive = false,
  isUpdate = false,
  projectId,
  ...props
}: ProjectEditFormProps) {
  const router = useRouter();
  const [isPublic, setIsPublic] = useState<boolean>(isActive);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<{
    state: boolean;
    title?: string;
    content: string;
    handleAlertConfirmation?: () => void;
    handleCloseAlert?: () => void;
  }>({ state: false, title: '', content: '' });

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useForm<ProjectFormTypes>({
      initialValues: {
        title: props.title || '',
        description: props.description || '',
        startedAt: props.startedAt || TODAY,
        finishedAt: props.finishedAt || '',
      },
      validate: (values) => {
        const errors = {
          title: '',
          description: '',
          startedAt: '',
          finishedAt: '',
          isActive: '',
        };

        if (!values.title) {
          errors.title = '프로젝트 제목을 입력해 주세요';
        }

        if (!values.description) {
          errors.description = '프로젝트 내용을 입력하세요';
        }

        if (!values.startedAt) {
          errors.startedAt = '기간을 설정하세요';
        }

        if (!values.finishedAt) {
          errors.finishedAt = '기간을 입력하세요';
        }

        return errors;
      },
      async onSubmit(values) {
        // 프로젝트 수정 로직입니다.
        if (isUpdate) {
          try {
            setSubmitLoading(true);
            const { data, status } = await updateProject(
              {
                ...values,
                isActive: Boolean(isPublic),
              },
              projectId || 0
            );

            if (status === 200) {
              setOpenAlert({
                state: true,
                title: '성공',
                content: '프로젝트가 수정되었습니다.',
                handleAlertConfirmation: () => {
                  router.replace('/projects/dash-board');
                },
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
          return;
        } else {
          // 프로젝트 생성 로직입니다.
          try {
            setSubmitLoading(true);
            const { data, status } = await createProject({
              ...values,
              isActive: Boolean(isPublic),
            });

            if (status === 201) {
              setOpenAlert({
                state: true,
                title: '성공',
                content: '프로젝트가 생성되었습니다.',
                handleAlertConfirmation: () => {
                  router.replace('/projects/dash-board');
                },
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
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2 mb-4">
        <p className="my-2 text-base font-medium md:text-lg">프로젝트 제목</p>
        <Input
          onChange={handleChange}
          onBlur={handleBlur}
          name="title"
          label=""
          placeholder="프로젝트 제목을 입력해 주세요"
          value={values.title}
          error={touched?.title && errors?.title}
          className="w-full h-10 p-2 text-sm border-t-0 border-b rounded-none outline-none border-x-0 fucus:outline-none"
        />

        <ErrorMsg name="title" errors={errors.title} touched={touched.title} />
      </div>
      {/* date */}
      <div className="my-2 ">
        <p className="my-2 text-base font-medium md:text-lg">프로젝트 기간</p>
        <div className="flex w-full">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="startedAt"
            label=""
            type="date"
            value={values.startedAt}
            error={touched?.startedAt && errors?.startedAt}
            className="w-full h-10 p-2 text-sm"
            placeholder=""
            min={isUpdate ? props.startedAt : TODAY}
          />
          <span className="self-center mx-2 text-lg font-medium text-gray-500">
            ~
          </span>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="finishedAt"
            label=""
            type="date"
            value={values.finishedAt}
            error={touched?.finishedAt && errors?.finishedAt}
            className="w-full h-10 p-2 text-sm"
            placeholder=""
            min={TODAY && values.startedAt}
          />
        </div>
        <ErrorMsg
          name={'startedAt' || 'finishedAt'}
          errors={errors.startedAt || errors.finishedAt}
          touched={touched.startedAt || touched.finishedAt}
        />
      </div>

      {/* description */}
      <div>
        <p className="my-2 text-base font-medium md:text-lg">프로젝트 내용</p>
        <Textarea
          onChange={(e: any) => handleChange(e)}
          onBlur={(b: any) => handleBlur(b)}
          name="description"
          label=""
          placeholder="프로젝트 내용을 입력해 주세요"
          value={values.description}
          error={touched?.description && errors?.description}
          className="w-full h-40 p-2 text-sm resize-none"
        />
        <ErrorMsg
          name="description"
          errors={errors.description}
          touched={touched.description}
        />
      </div>
      <div className="flex justify-end">
        <div className="flex my-auto mr-4 items-cente">
          {/* 공개여부 */}
          <input
            onChange={() => setIsPublic(!isPublic)}
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={isPublic}
            className="w-5 h-5 my-auto border-2 border-gray-400 rounded-md"
          />
          <label htmlFor="isActive" className="ml-2 text-base font-medium">
            비공개
          </label>
        </div>

        <div>
          <Button
            disabled={submitLoading}
            type="submit"
            className="w-auto px-2 text-base bg-blue-600"
          >
            {isUpdate ? '프로젝트 수정' : '프로젝트 생성'}
          </Button>
        </div>
      </div>
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
