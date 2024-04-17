import { deleteTask } from '@/api/projects/tasks';
import Portal from '@/components/UI/Portal';
import { TasksTypes } from '@/types/projects';
import {
  SvgDeleteCan,
  SvgDotedCheck,
  SvgHat,
  SvgKebab,
  SvgUpdatePencilRound,
} from '@/utils/images';
import { convertCycleToKorean } from '@/utils/utils';
import { useState } from 'react';

type TaskListItemProps = {
  task: TasksTypes;
  isLastTask: boolean;
  onDeleteTask: () => void;
  onUpdateTask: (taskId: number) => void;
};

export default function TaskListItem({
  task,
  isLastTask = false,
  onDeleteTask,
  onUpdateTask,
}: TaskListItemProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleDeleteTask = async (taskId: number) => {
    const { data, status } = await deleteTask(taskId);
    console.log(data, status);

    if (status === 200) {
      setOpenMenu(false);
      onDeleteTask();
    }
  };

  return (
    <div
      className={`w-full p-2 md:p-4 my-3 rounded-md md:rounded-lg  h-auto ${
        isLastTask ? 'border border-gray-400' : 'border border-gray-400'
      }`}
    >
      <div className="flex items-center justify-between h-auto">
        <div className="flex justify-start text-sm font-normal md:text-lg md:font-medium">
          <div className="">{task.startedAt.replaceAll('-', '.')}</div>
          <div className="mx-2">-</div>
          <div>{task?.finishedAt.replaceAll('-', '.')}</div>
          <div className="ml-2">({task?.progressData.totalDays}일)</div>
        </div>
        <button className="relative" onClick={() => setOpenMenu(!openMenu)}>
          <SvgKebab className="stroke-gray-400" />
          {!openMenu ? null : (
            <>
              <Portal>
                <div
                  className="fixed z-[15] top-0 rigth-0 w-screen h-screen"
                  onClick={() => setOpenMenu(false)}
                ></div>
              </Portal>

              <div className="z-[20] w-20 absolute right-0 bg-white border border-gray-400 rounded-md top-7 shadow-lg">
                <div
                  className={`flex justify-between h-8 px-2 py-1 border-b border-gray-400`}
                  onClick={() => {
                    setOpenMenu(false);
                    onUpdateTask(task?.id);
                  }}
                >
                  <div className="self-center my-auto">
                    <SvgUpdatePencilRound />
                  </div>
                  <div className="self-center text-xs sm:text-sm md:text-base">
                    수정
                  </div>
                </div>
                <div
                  className={`flex justify-between h-8 px-2 py-1`}
                  onClick={() => handleDeleteTask(task?.id)}
                >
                  <div className="self-center w-5 my-auto">
                    <SvgDeleteCan className="mx-auto" />
                  </div>
                  <div className="self-center text-xs sm:text-sm md:text-base">
                    삭제
                  </div>
                </div>
              </div>
            </>
          )}
        </button>
      </div>

      <div>
        <p className="text-base font-semibold md:text-lg lg:text-xl md:font-semibold">
          {task.title}
        </p>
      </div>
      <div className="h-auto my-2 text-sm sm:text-base md:flex md:justify-start">
        <div className="flex justify-start mr-4 font-medium">
          <div
            className={`my-auto mr-2 w-3 h-3 rounded-full`}
            style={{ backgroundColor: `#${task.color.colorCode}` }}
          ></div>
          <div className="mr-2">{task.category.name}</div>
          <div className="flex items-center mr-2">
            <SvgDotedCheck />
          </div>
          <div className="mr-2">
            {(task.progressData.achivementRate * 100).toFixed(1)}%
          </div>
          <div className="flex items-center mr-2">
            <SvgHat />
          </div>
          <div className="mr-2">
            {task.progressData.expectedAccumulation &&
            task.progressData.accumulation !== undefined
              ? (
                  (task.progressData.accumulation /
                    task.progressData.expectedAccumulation) *
                  100
                ).toFixed(1)
              : '0.0'}
            %
          </div>
        </div>
        <div className="flex justify-start text-sm font-medium text-gray-500 sm:text-base">
          <p className="mr-2">
            {convertCycleToKorean(task.taskGoal.cycleType)}
          </p>
          <p className="mr-2">
            {task.taskGoal.cycleCount}
            {task.taskGoal.countType === 'COUNT' ? '회' : '시간'}
          </p>
          <p className="mr-2">|</p>
          <p className="mr-2">
            {task.taskGoal.isWeekendsExcl ? '주말 제외' : '주말 포함'}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-start md:justify-between">
        {/* 진행바 */}
        <div className="relative w-full md:w-[90%] h-5 rounded-sm bg-stone-300">
          {/* 현재 진행 */}
          <div
            className={`absolute h-full z-[5] rounded-sm hover:shadow-md`}
            style={{
              backgroundColor: `#${task.color?.colorCode}`,
              width: `${Math.min(
                task.progressData?.achivementRate * 100,
                100
              )}%`,
            }}
          >
            {/* {showAccumulation && (
                        <div className="rounded-sm top-5 p-1 shadow-md absolute z-[10] w-auto  text-slate-800 bg-neutral-300">
                          <p className="m-auto text-xs">
                            {task.progressData.accumulation}
                            {task.taskGoal.countType === 'COUNT'
                              ? '회'
                              : '시간'}
                          </p>
                        </div>
                      )} */}
          </div>
          {/* 예상 진행 */}
          <div
            className={`absolute h-full z-[10] rounded-sm opacity-50 hover:shadow-md hover:opacity-70`}
            style={{
              backgroundColor: `#${task.color?.colorCode}`,
              width: `${Math.min(
                task.progressData?.expectedAchivementRate * 100,
                100
              )}%`,
            }}
          >
            <div className="hidden hover:inline-block"></div>
          </div>
        </div>
        <div className="items-center hidden text-sm font-semibold sm:text-base md:inline-block">
          {task.progressData?.goal}
          {task.taskGoal?.countType === 'COUNT' ? '회' : '시간'}
        </div>
      </div>
      <div className="my-2 text-sm font-normal text-gray-500 whitespace-pre-wrap sm:text-base">
        {task.description}
      </div>
    </div>
  );
}
