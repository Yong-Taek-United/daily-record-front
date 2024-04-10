import { CalendarEvent } from '@/pages/main';
import { CalendarDataType } from '@/types/calendar';

import { SvgPlus } from '@/utils/images';
import { use, useEffect, useState } from 'react';

export default function MobileActivitiesList({
  filteredActivities,
  selectedDate,
  isVisible,
  onClose,
}: {
  filteredActivities: CalendarDataType[];
  selectedDate: Date;
  isVisible: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={`fixed z-30 w-full h-screen p-3 transform ${
          isVisible ? 'translate-y-20' : 'translate-y-full'
        } transition-transform duration-300 ease-in-out  bg-white rounded-t-md md:hidden `}
      >
        <div className="w-full py-2" onClick={onClose}>
          <div className="w-16 h-3 mx-auto text-center bg-gray-200 rounded-md"></div>
        </div>
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
                <p className="mb-1 font-medium truncate sm:font-semibold">
                  {activity?.title}
                </p>
                <p className="text-sm text-gray-700 truncate sm:text-base">
                  {activity?.task?.title}
                </p>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {activity?.task?.description}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500">
                  {activity.actedTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
