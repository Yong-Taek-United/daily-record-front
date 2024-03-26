import { GetProjectsRes, getTasks } from '@/api/projects/projects';
import Button from '../Button';
import {
  SvgDotedCheck,
  SvgHat,
  SvgPlus,
  SvgUpdatePencil,
} from '@/utils/images';
import { useState } from 'react';
import AccordionIcon from '../AccordionIcon';
import { TasksTypes } from '@/types/projects';
import { convertCycleToKorean } from '@/utils/utils';

type PropsType = {
  item: GetProjectsRes;
};
export function ProjectListItem({ item }: PropsType) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [didFetch, setDidFetch] = useState(false);
  const [tasksList, setTaskList] = useState<TasksTypes[]>([]);

  // 진행바
  // const [showAccumulation, setShowAccumulation] = useState(false);
  // const [showEspectedAccum, setShowExpectedAccum] = useState(false);

  const getTasksList = async () => {
    try {
      setIsLoading(true);
      const { status, data } = await getTasks({ projectId: item.id });
      if (status === 200) {
        setTaskList(data?.data);
      }
    } catch (error) {
    } finally {
      setDidFetch(true);
      setIsOpen(true);
      setIsLoading(false);
    }
  };

  const handleAccordion = () => {
    if (didFetch) {
      setIsOpen(!isOpen);
    } else {
      getTasksList();
    }
  };

  return (
    <div className={`relative overflow-hidden border-b p-4 border-gray-400`}>
      <div className="">
        <div className="flex flex-row justify-between w-full align-middle h-28">
          {/* 좌측 */}
          <button
            onClick={handleAccordion}
            className="flex flex-col justify-around w-4/5 md:justify-start bg-pink-0 md:flex-row md:my-auto"
          >
            <div className="mr-4 font-medium lg:text-lg">{`${item.startedAt.replaceAll(
              '-',
              '.'
            )} - ${item.finishedAt.replaceAll('-', '.')}`}</div>
            <div className="font-semibold lg:text-lg">{item.title}</div>
          </button>
          {/* 우측 */}
          <div className="flex flex-col justify-around w-1/5 align-middle md:justify-end md:flex-row md:my-auto">
            <div className="mx-auto flex-end lg:mr-4">
              <Button className="w-16 text-xs h-7 hover:bg-gray-900 md:w-20 md:text-sm lg:w-28">
                기록보기
              </Button>
            </div>
            <button className="text-center cursor-pointer">
              <SvgUpdatePencil className="mx-auto " />
            </button>
          </div>
        </div>
        <div className="">
          <div onClick={handleAccordion} className="w-6 m-auto cursor-pointer ">
            <AccordionIcon isOpen={isOpen} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className={``}>
          <div className="flex justify-end">
            <button className="flex items-center h-auto">
              <div className="mr-2 ">
                <SvgPlus />
              </div>
              <p className="text-gray-800 underline">과제 생성하기</p>
            </button>
          </div>
          {tasksList?.length ? (
            tasksList.map((task, i) => (
              <div
                key={i}
                className={`w-full p-4 my-3  h-auto ${
                  tasksList.length === i + 1 ? '' : 'border-b border-gray-400'
                }`}
              >
                <div className="flex justify-start text-sm font-normal md:text-lg md:font-medium">
                  <div className="">{task.startedAt.replaceAll('-', '.')}</div>
                  <div className="mx-2">-</div>
                  <div>{task.finishedAt.replaceAll('-', '.')}</div>
                  <div className="ml-2">
                    ({task.progressData.elapsedDays}일)
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold md:text-xl md:font-bold">
                    {task.title}
                  </p>
                </div>
                <div className="h-auto my-2 md:flex md:justify-start">
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
                      {(
                        (task.progressData.accumulation /
                          task.progressData.expectedAccumulation) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="flex justify-start font-medium text-gray-500">
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
                        backgroundColor: `#${task.color.colorCode}`,
                        width: `${task.progressData.achivementRate * 100}%`,
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
                      className={`absolute h-full z-[3] rounded-sm opacity-50 hover:shadow-md hover:opacity-70`}
                      style={{
                        backgroundColor: `#${task.color.colorCode}`,
                        width: `${
                          task.progressData.estimatedAchivementRate * 100
                        }%`,
                      }}
                    >
                      <div className="hidden hover:inline-block">gd</div>
                    </div>
                  </div>
                  <div className="items-center hidden font-semibold md:inline-block">
                    {task.progressData.goal}
                    {task.taskGoal.countType === 'COUNT' ? '회' : '시간'}
                  </div>
                </div>
                <div className="my-2 text-base font-normal text-gray-500">
                  {task.description}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-5 text-base font-normal text-gray-500 ">
              <p className="mx-auto text-center">과제가 없습니다.</p>
            </div>
          )}
        </div>
      ) : null}
      {/* 과제 */}
    </div>
  );
}
