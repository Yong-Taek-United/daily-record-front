import { SvgRigthArrow } from '@/utils/images';

import { useRouter } from 'next/router';
import { ToolbarProps } from 'react-big-calendar';

export default function Toolbar({ date, onNavigate }: ToolbarProps) {
  const router = useRouter();

  const handleNavigate = (action: 'PREV' | 'NEXT') => {
    onNavigate(action);

    const newDate = new Date(date);
    if (action === 'PREV') {
      newDate.setMonth(date.getMonth() - 1);
    } else if (action === 'NEXT') {
      newDate.setMonth(date.getMonth() + 1);
    }

    router.push({
      pathname: router.pathname,
      query: { year: newDate.getFullYear(), month: newDate.getMonth() + 1 },
    });
  };

  return (
    <div className="flex justify-between py-2 px-4 sm:py-4 sm:px-8">
      <div>
        <p className="text-base font-medium sm:text-lg">{`${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월`}</p>
      </div>
      <div className="flex items-center">
        <button onClick={() => handleNavigate('PREV')} className="px-3">
          <SvgRigthArrow className="rotate-180" />
        </button>
        <button onClick={() => handleNavigate('NEXT')} className="px-3">
          <SvgRigthArrow />
        </button>
      </div>
    </div>
  );
}
