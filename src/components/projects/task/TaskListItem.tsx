import { TasksTypes } from '@/types/projects';
import { SvgDotedCheck, SvgHat } from '@/utils/images';
import { convertCycleToKorean } from '@/utils/utils';

type TaskListItemProps = {
  task: TasksTypes;
  isLastTask: boolean;
};

export default function TaskListItem({
  task,
  isLastTask = false,
}: TaskListItemProps) {
  return (
    <div
      className={`w-full p-4 my-3  h-auto ${
        isLastTask ? '' : 'border-b border-gray-400'
      }`}
    >
      <div className="flex justify-start text-sm font-normal md:text-lg md:font-medium">
        <div className="">{task.startedAt.replaceAll('-', '.')}</div>
        <div className="mx-2">-</div>
        <div>{task.finishedAt.replaceAll('-', '.')}</div>
        <div className="ml-2">({task.progressData.elapsedDays}일)</div>
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
              width: `${task.progressData.estimatedAchivementRate * 100}%`,
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
  );
}
