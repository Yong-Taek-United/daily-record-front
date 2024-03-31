import { TaskCategoriesType } from '@/api/projects/categories';
import { useCategories } from '@/hooks/useCategories';
import { SvgFilledDownArrow } from '@/utils/images';
import { useState } from 'react';

type TaskCtgoListProps = {
  onSelectTaskCtgo: (color: TaskCategoriesType) => void;
  value: number;
};

export default function TaskCtgoList({
  onSelectTaskCtgo,
  value,
}: TaskCtgoListProps) {
  const { useTaskCategories } = useCategories();
  const { taskCategories, TaskCategoriesLoading, TaskCategoriesError } =
    useTaskCategories();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(value);

  const onHandleSelect = (item: TaskCategoriesType) => {
    setOpenMenu(false);
    onSelectTaskCtgo(item);
    setSelectedId(item.id);
  };

  if (TaskCategoriesLoading)
    return (
      <div className={`w-full`}>
        <div className="flex justify-between h-8 px-2 py-1 bg-gray-200 border border-gray-400 rounded-md animate-pulse cursor-progress"></div>
      </div>
    );

  if (TaskCategoriesError)
    return (
      <div className={`w-full`}>
        <div className="flex justify-between h-8 px-2 py-1 border border-gray-400 rounded-md cursor-not-allowed">
          <p className="self-center text-sm">Err</p>
          <div className="my-auto">
            <SvgFilledDownArrow />
          </div>
        </div>
      </div>
    );

  return (
    <div className={`relative w-full`}>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="flex justify-between h-8 px-2 py-1 border border-gray-400 rounded-md cursor-pointer "
      >
        {selectedId ? (
          <div className="self-center text-xs sm:text-sm md:text-base">
            {taskCategories?.filter((item) => item.id === selectedId)[0].name}
          </div>
        ) : (
          <p className="self-center text-xs sm:text-sm md:text-base">선택</p>
        )}

        <div className="my-auto">
          <SvgFilledDownArrow />
        </div>
        {openMenu ? (
          <>
            <div
              onClick={() => setOpenMenu(false)}
              className="fixed z-[15] top-0 left-0 w-screen h-screen bg-transparent"
            ></div>
            <div className="z-[20] absolute left-0 w-full bg-white border border-gray-400 rounded-md top-9">
              {taskCategories?.map((item, i) => (
                <div
                  className={`flex justify-start h-8 px-2 py-1 ${
                    taskCategories.length === i + 1
                      ? ''
                      : 'border-b border-gray-400'
                  }`}
                  onClick={() => onHandleSelect(item)}
                  key={item.id}
                >
                  <div className="self-center text-xs sm:text-sm md:text-base">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
