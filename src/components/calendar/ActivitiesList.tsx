import { CalendarEvent } from '@/pages/main';
import { CalendarDataType } from '@/types/calendar';

import { SvgPlus } from '@/utils/images';

export default function ActivitiesList({
  filteredActivities,
  selectedDate,
}: {
  filteredActivities: CalendarDataType[];
  selectedDate: Date;
}) {
  return (
    <div className="relative hidden md:block bg-white lg:ml-4 w-[320px] rounded-md p-3">
      <div className="h-[5%] flex justify-between mb-5 items-center">
        <div className="text-base font-medium">{`${
          selectedDate.getMonth() + 1
        }월 ${
          selectedDate.getDate() < 10
            ? `0${selectedDate.getDate()}`
            : selectedDate.getDate()
        }일 | ${selectedDate.toLocaleDateString('ko-KR', {
          weekday: 'long',
        })}`}</div>
        <button className="self-center">
          <SvgPlus />
        </button>
      </div>

      <div className="overflow-y-auto h-[90%]">
        {/* 액티비티 */}
        {filteredActivities[0]?.activities.map((activity) => (
          <div
            onClick={() => console.log(activity)}
            key={activity.id}
            className="flex w-full my-2 cursor-pointer"
          >
            <div
              className="w-[10%] mr-2 rounded-l-sm m-h-full"
              style={{
                backgroundColor: `#${activity?.task?.color?.colorCode}`,
              }}
            ></div>
            <div className="w-[90%]">
              <p className="mb-1 font-semibold truncate">{activity?.title}</p>
              <p className="font-medium text-gray-700 truncate">
                {activity?.task?.title}
              </p>
              <p className="text-sm text-gray-500">
                {activity?.task?.description}
              </p>
              <p className="text-xs text-gray-500">{activity.actedTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
