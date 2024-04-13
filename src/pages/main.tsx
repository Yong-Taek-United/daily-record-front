import { setContext } from '@/api/authInterceptorWithSSR';
import { getCalendarData } from '@/api/calendar/calendar';
import { ActivityType, CalendarDataType } from '@/types/calendar';
import { Event as RCBEvent } from 'react-big-calendar';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import ActivitiesList from '@/components/calendar/ActivitiesList';
import MobileActivitiesList from '@/components/calendar/MobileActivitiesList';
import Header from '@/components/UI/Header';
import Toolbar from '@/components/calendar/Toolbar';
import dynamic from 'next/dynamic';

const MyCalendar = dynamic(() => import('@/components/calendar/Calendar'), {
  ssr: false,
});

export interface CalendarEvent extends RCBEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource?: ActivityType;
}

export default function Main({
  month,
  year,
  activities,
}: {
  year: string;
  month: string;
  activities: CalendarDataType[];
}) {
  // 달력 데이터 가공
  const formatCalendarData = (
    CalendarData: CalendarDataType[]
  ): CalendarEvent[] => {
    if (!CalendarData) return [];
    let events: CalendarEvent[] = CalendarData.flatMap((data) =>
      data.activities.map((activity) => ({
        id: activity.id,
        title: activity.task?.title,
        start: new Date(activity.actedDate),
        end: new Date(activity.actedDate),
        resource: activity,
      }))
    );

    return events;
  };

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [mobileList, setMobileList] = useState(false);

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    setMobileList(true);
  };

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <main className="w-full h-screen bg-gray-50">
      <Header />
      <MobileActivitiesList
        filteredActivities={activities?.filter(
          (activity) =>
            activity.actedDate === formatDate(selectedDate || new Date())
        )}
        selectedDate={selectedDate || new Date()}
        isVisible={mobileList}
        onClose={() => setMobileList(false)}
      />
      {mobileList && (
        <div
          className="fixed inset-0 top-0 z-20 bg-black bg-opacity-25 md:hidden backdrop-blur-sm"
          onClick={() => setMobileList(false)}
        ></div>
      )}
      <div className="mx-auto mt-4 max-w-7xl md:flex lg:justify-between h-4/5">
        <div className="w-full h-full p-3 bg-white rounded-md">
          <MyCalendar
            components={{
              toolbar: Toolbar,
            }}
            defaultDate={new Date(`${year}-${month}`)}
            events={formatCalendarData(activities)}
            onSelectEvent={({ start, resource }) => {
              handleSelect(start as Date);
            }}
            onSelectSlot={({ start }) => {
              handleSelect(start);
            }}
            onDrillDown={(date) => handleSelect(date)}
            selectable={true}
            longPressThreshold={10}
          />
        </div>

        <ActivitiesList
          filteredActivities={activities?.filter(
            (activity) =>
              activity.actedDate === formatDate(selectedDate || new Date())
          )}
          selectedDate={selectedDate || new Date()}
        />
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  setContext(context);
  const YEAR = new Date().getFullYear();
  const MONTH = new Date().getMonth() + 1;
  const { year = YEAR, month = MONTH } = context.query as {
    year: string;
    month: string;
  };
  const activities: CalendarDataType[] = [];
  try {
    const { status, data } = await getCalendarData({
      year: String(year),
      month: String(month),
    });
    if (status === 200 && data) {
      activities.push(...data.data);
    }
  } catch (error) {}

  return {
    props: {
      activities,
      year: String(year),
      month: String(month),
    },
  };
}
