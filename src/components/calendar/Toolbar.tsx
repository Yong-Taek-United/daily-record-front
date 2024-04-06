import { SvgRigthArrow } from '@/utils/images';
import { ToolbarProps } from 'react-big-calendar';

export default function Toolbar({ date, onNavigate }: ToolbarProps) {
  return (
    <div className="flex justify-between py-2 px-4 sm:py-4 sm:px-8">
      <div>
        <p className="text-base font-medium sm:text-lg">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</p>
      </div>
      <div className="flex items-center">
        <button onClick={() => onNavigate('PREV')} className="px-3">
          <SvgRigthArrow className="rotate-180" />
        </button>
        <button onClick={() => onNavigate('NEXT')} className="px-3">
          <SvgRigthArrow />
        </button>
      </div>
    </div>
  );
}
