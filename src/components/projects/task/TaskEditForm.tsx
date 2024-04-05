import { CountType, CycleType, TasksTypes } from '@/types/projects';
import ColorList from '../categories/ColorList';
import useForm from '@/hooks/useForm';
import TaskCtgoList from '../categories/TaskCtgoList';
import Input from '@/components/Input';
import ErrorMsg from '@/components/ErrorMsg';
import Textarea from '@/components/Textarea';
import Button from '@/components/Button';
import { useMemo, useState } from 'react';
import CycleList from '../categories/CycleList';
import { TaskEditFormType } from '@/types/tasks';
import { createTask, updateTask } from '@/api/projects/tasks';
import axios from 'axios';
import Alert from '@/components/modal/Alert';
import {
  calculateCycleDaysExclWeekends,
  calculateDaysBetween,
  convertCountToKorean,
  convertCycleToKorean,
  convertCycleToNumber,
  countWeekendsBetween,
} from '@/utils/utils';

type TaskEditFormProps = {
  isUpdate: boolean;
  projectId: number;
  taskData: TasksTypes | null;
  onCancel: () => void;
  onSuccessful: () => void;
};

// 현재 연도, 월, 일을 가져오는 함수
const YEAR = new Date().getFullYear();
const MONTH = new Date().getMonth() + 1;
const DATE = new Date().getDate();

const TODAY = `${YEAR}-${MONTH < 10 ? `0${MONTH}` : MONTH}-${
  DATE < 10 ? `0${DATE}` : DATE
}`;

export default function TaskEditForm({
  projectId,
  isUpdate,
  taskData,
  onCancel,
  onSuccessful,
}: TaskEditFormProps) {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<{
    state: boolean;
    title?: string;
    content: string;
    handleAlertConfirmation?: () => void;
    handleCloseAlert?: () => void;
  }>({ state: false, title: '', content: '' });
  const {
    values,
    setValues,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useForm<TaskEditFormType>({
    initialValues: {
      title: isUpdate && taskData ? taskData.title : '',
      description: isUpdate && taskData ? taskData?.description : '',
      startedAt: isUpdate && taskData ? taskData.startedAt : TODAY,
      finishedAt: isUpdate && taskData ? taskData.finishedAt : '',
      project: {
        id: projectId || 0,
      },
      category: {
        id: isUpdate && taskData ? taskData.category.id : 1,
      },
      color: {
        id: isUpdate && taskData ? taskData.color.id : 1,
      },
      icon: {
        id: isUpdate && taskData ? taskData.icon.id : 1,
      },
      taskGoal: {
        countType: isUpdate && taskData ? taskData.taskGoal.countType : 'COUNT',
        cycleType: isUpdate && taskData ? taskData.taskGoal.cycleType : 'DAY',
        cycleCount: isUpdate && taskData ? taskData.taskGoal.cycleCount : 1,
        goal: isUpdate && taskData ? taskData.taskGoal.goal : 1,
        isWeekendsExcl:
          isUpdate && taskData
            ? Boolean(taskData.taskGoal.isWeekendsExcl)
            : false,
      },
      taskPush: {
        cycleType: isUpdate && taskData ? taskData.taskPush.cycleType : 'DAY',
        // pushTime: isUpdate && taskData ? taskData.taskPush.pushTime : '09:00',
        pushTime: '09:00',
        isPushEnabled:
          isUpdate && taskData
            ? Boolean(taskData.taskPush.isPushEnabled)
            : false,
      },
    },
    validate: (values) => {
      const errors = {
        title: '',
        description: '',
        startedAt: '',
        finishedAt: '',
        project: '',
        category: '',
        color: '',
        icon: '',
        taskGoal: '',
        taskPush: '',
      };

      if (!values.title) {
        errors.title = '과제 제목을 입력해 주세요';
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

      if (values.taskGoal.cycleCount < 1) {
        errors.taskGoal = '체크 횟수를 1 이상 입력하세요';
      }

      return errors;
    },
    async onSubmit(values) {
      console.log('values', values);
      // 과제 수정 로직입니다.
      if (isUpdate) {
        try {
          setSubmitLoading(true);
          const { data, status } = await updateTask(
            {
              ...values,
              taskGoal: {
                ...values.taskGoal,
                id: taskData?.taskGoal.id,
              },
              taskPush: {
                ...values.taskPush,
                id: taskData?.taskPush.id,
              },
            },
            taskData?.id || 0
          );
          if (status === 200) {
            onSuccessful();
            onCancel();
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
          const { data, status } = await createTask({
            ...values,
          });
          if (status === 201) {
            //
            onSuccessful();
            onCancel();
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

  const calculateGoal = (
    totalDay: number,
    totalWeekend: number,
    isWeekendsExcl: boolean,
    cycleCount: number,
    cycleType: CycleType,
    countType: CountType
  ) => {
    const cycleDays = convertCycleToNumber(cycleType);
    const cycleDaysExclWeekends = isWeekendsExcl
      ? calculateCycleDaysExclWeekends(cycleType)
      : 0;
    const effectiveDays = totalDay - (isWeekendsExcl ? totalWeekend : 0);
    const goal =
      (effectiveDays / (cycleDays - cycleDaysExclWeekends)) * cycleCount;
    const roundedGoal = parseFloat(goal.toFixed(2));

    setValues((prev) => ({
      ...prev,
      taskGoal: { ...prev.taskGoal, goal: roundedGoal },
    }));

    return `${totalDay}일 동안 ${convertCycleToKorean(
      cycleType
    )}에 ${cycleCount}${convertCountToKorean(
      countType
    )} = 총 ${roundedGoal}${convertCountToKorean(countType)}`;
  };

  const goalValue = useMemo(() => {
    const { startedAt, finishedAt, taskGoal } = values;
    const { isWeekendsExcl, cycleCount, cycleType, countType } = taskGoal;

    if (!startedAt || !finishedAt) {
      return '기간과 체크 방식을 선택하면 목표량이 계산됩니다.';
    }

    const totalDay = calculateDaysBetween(startedAt, finishedAt);
    const totalWeekend = countWeekendsBetween(startedAt, finishedAt);

    if (typeof totalDay !== 'number' || typeof totalWeekend !== 'number') {
      return '기간과 체크 방식을 선택하면 목표량이 계산됩니다.';
    }

    return calculateGoal(
      totalDay,
      totalWeekend,
      isWeekendsExcl,
      cycleCount,
      cycleType,
      countType
    );
  }, [
    values.startedAt,
    values.finishedAt,
    values.taskGoal.isWeekendsExcl,
    values.taskGoal.cycleCount,
    values.taskGoal.cycleType,
    values.taskGoal.countType,
  ]);

  return (
    <form className="border-b border-gray-400" onSubmit={handleSubmit}>
      <div
        className={`w-full p-2 md:p-4 my-3  h-auto border border-gray-400 rounded-md md:rounded-lg
      `}
      >
        {/* <p className="hidden my-2 text-base font-medium md:block md:text-lg">
        과제 제목
      </p> */}
        <p className="hidden my-2 text-sm font-medium md:text-base md:block">
          제목
        </p>
        <div className="md:flex md:flex-start md:mb-2">
          <div className="flex mb-3 flex-start md:mb-0">
            <div className="w-16 mr-2">
              <ColorList
                onSelectColor={(color) => {
                  setValues((prev) => ({ ...prev, color: { id: color.id } }));
                }}
                value={values.color.id}
              />
            </div>
            <div className="w-full md:w-28 md:mr-2">
              <TaskCtgoList
                onSelectTaskCtgo={(item) => {
                  setValues((prev) => ({ ...prev, category: { id: item.id } }));
                }}
                value={values.category.id}
              />
            </div>
          </div>
          <div className="w-full mb-2 md:mb-0">
            <p className="text-sm font-medium md:text-base md:hidden">제목</p>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="title"
              label=""
              placeholder="과제 제목을 입력해 주세요"
              value={values.title}
              error={touched?.title && errors?.title}
              className="w-full h-8 p-2 text-sm border-t-0 border-b rounded-none outline-none border-x-0 fucus:outline-none"
            />

            <ErrorMsg
              name="title"
              errors={errors.title}
              touched={touched.title}
            />
          </div>
        </div>

        <div className="my-2 md:flex md:flex-start">
          {/* date */}
          <div className="w-full">
            <p className="my-2 text-sm font-medium md:text-base">
              프로젝트 기간
            </p>
            <div className="flex justify-between w-full sm:justify-start">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="startedAt"
                label=""
                type="date"
                value={values.startedAt}
                error={touched?.startedAt && errors?.startedAt}
                className="w-full h-8 p-2 text-xs md:text-sm"
                placeholder=""
                min={isUpdate ? taskData?.startedAt : TODAY}
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
                className="w-full h-8 p-2 text-xs md:text-sm"
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
          {/* cycle */}
          <div className="w-full">
            <p className="my-2 text-sm font-medium md:text-base">체크 방식</p>
            <div className="flex flex-wrap items-center justify-start">
              <div className="w-20 mr-2">
                <CycleList
                  onSelect={(item) =>
                    setValues((prev) => ({
                      ...prev,
                      taskGoal: {
                        ...prev.taskGoal,
                        cycleType: item,
                      },
                    }))
                  }
                  value={values.taskGoal.cycleType}
                />
              </div>
              <div className="mr-2">
                <input
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      taskGoal: {
                        ...prev.taskGoal,
                        cycleCount: Number(e.target.value),
                      },
                    }))
                  }
                  type="number"
                  min={1}
                  value={values.taskGoal.cycleCount}
                  className="h-8 p-2 text-xs text-center border border-gray-400 rounded-md w-14"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  setValues((prev) => ({
                    ...prev,
                    taskGoal: {
                      ...prev.taskGoal,
                      countType: 'COUNT',
                    },
                  }));
                }}
                className={`mr-2 h-8 px-2 sm:px-4 text-xs sm:text-sm  rounded-full 
              ${
                values.taskGoal.countType === 'COUNT'
                  ? 'text-white border border-black bg-black'
                  : 'text-gray-700 border border-gray-600  bg-stone-300'
              }`}
              >
                N 회
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setValues((prev) => ({
                    ...prev,
                    taskGoal: {
                      ...prev.taskGoal,
                      countType: 'DURATION',
                    },
                  }));
                }}
                className={`mr-2 h-8 px-2 sm:px-4 text-xs sm:text-sm rounded-full 
              ${
                values.taskGoal.countType === 'DURATION'
                  ? 'text-white border border-black bg-black'
                  : 'text-gray-700 border border-gray-400  bg-stone-300'
              }`}
              >
                N 시간
              </button>
              <div className="flex my-auto mt-2 sm:mt-auto items-cente">
                {/* 공개여부 */}
                <input
                  onChange={() =>
                    setValues((prev) => ({
                      ...prev,
                      taskGoal: {
                        ...prev.taskGoal,
                        isWeekendsExcl: !prev.taskGoal.isWeekendsExcl,
                      },
                    }))
                  }
                  type="checkbox"
                  name="taskGoal.exclWeekends"
                  id="taskGoal.exclWeekends"
                  checked={values.taskGoal.isWeekendsExcl}
                  className="w-4 h-4 my-auto border border-gray-400 rounded-md"
                />
                <label
                  htmlFor="taskGoal.exclWeekends"
                  className="ml-2 text-sm text-gray-700 font-base md:text-base"
                >
                  주말 제외
                </label>
              </div>
            </div>
            <ErrorMsg
              name="taskGoal"
              errors={errors.taskGoal}
              touched={touched.taskGoal}
            />
          </div>
        </div>

        <div>{goalValue}</div>
        <div className="w-full">
          <p className="my-2 text-sm font-medium md:text-base">과제 내용</p>
          <Textarea
            onChange={(e: any) => handleChange(e)}
            onBlur={(b: any) => handleBlur(b)}
            name="description"
            label=""
            placeholder="과제 내용을 입력해 주세요"
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
        <div className="w-full my-2">
          <div className="flex justify-end ">
            <Button
              onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}
              className="w-auto px-4 mr-3 text-sm font-normal text-gray-700 bg-stone-300 md:text-base md:font-medium "
            >
              취소
            </Button>
            <Button
              disabled={submitLoading}
              type="submit"
              className="w-auto px-4 text-sm font-normal bg-blue-600 md:text-base md:font-medium disabled:bg-blue-300"
            >
              {isUpdate ? '과제 수정' : '과제 생성'}
            </Button>
          </div>
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
