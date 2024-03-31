import { ColorsType } from '@/api/projects/categories';
import { useCategories } from '@/hooks/useCategories';
import { SvgFilledDownArrow } from '@/utils/images';
import { useState } from 'react';

type ColorListProps = {
  onSelectColor: (color: ColorsType) => void;
  value: number;
};

export default function ColorList({ onSelectColor, value }: ColorListProps) {
  const { useColors } = useCategories();
  const { colors, ColorsLoading, ColorsError } = useColors();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedColorId, setSelectedColorId] = useState<number>(value);

  const onHandleSelectColor = (color: ColorsType) => {
    setOpenMenu(false);
    onSelectColor(color);
    setSelectedColorId(color.id);
  };

  if (ColorsLoading)
    return (
      <div className={`w-full`}>
        <div className="flex justify-between h-8 px-2 py-1 bg-gray-200 border border-gray-400 rounded-md animate-pulse cursor-progress"></div>
      </div>
    );

  if (ColorsError)
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
        {selectedColorId ? (
          <div
            className="w-3 h-3 my-auto rounded-full"
            // style={{ backgroundColor: `#${selectedColor.colorCode}` }}
            style={{
              backgroundColor: `#${
                colors?.filter((item) => item.id === selectedColorId)[0]
                  .colorCode
              }`,
            }}
          ></div>
        ) : (
          <p className="self-center text-sm">색상</p>
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
              {colors?.map((color, i) => (
                <div
                  className={`flex justify-start h-8 px-2 py-1 ${
                    colors.length === i + 1 ? '' : 'border-b border-gray-400'
                  }`}
                  onClick={() => onHandleSelectColor(color)}
                  key={color.id}
                >
                  <div
                    className="w-3 h-3 my-auto rounded-full"
                    style={{ backgroundColor: `#${color.colorCode}` }}
                  ></div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
