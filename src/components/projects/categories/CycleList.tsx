import { CycleType } from '@/types/projects';
import { SvgFilledDownArrow } from '@/utils/images';
import { useState } from 'react';

type CycleListProps = {
  onSelect: (item: CycleType) => void;
  value: CycleType;
};

const LIST: { name: string; value: CycleType }[] = [
  { name: '하루', value: 'DAY' },
  { name: '일주일', value: 'WEEK' },
  { name: '한 달', value: 'MONTH' },
  { name: '일 년', value: 'YEAR' },
];

export default function CycleList({ onSelect, value }: CycleListProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CycleType>(value);

  const onHandleSelect = (item: CycleType) => {
    setOpenMenu(false);
    onSelect(item);
    setSelectedItem(item);
  };

  return (
    <div className={`relative w-full`}>
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="flex justify-between h-8 px-2 py-1 border border-gray-400 rounded-md cursor-pointer "
      >
        {selectedItem ? (
          <div className="self-center text-xs sm:text-sm md:text-base">
            {LIST?.filter((item) => item.value === selectedItem)[0].name}
          </div>
        ) : (
          <p className="self-center text-xs sm:text-sm md:text-base">주기</p>
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
              {LIST?.map((item, i) => (
                <div
                  className={`flex justify-start h-8 px-2 py-1 ${
                    LIST.length === i + 1 ? '' : 'border-b border-gray-400'
                  }`}
                  onClick={() => onHandleSelect(item.value)}
                  key={item.value}
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
