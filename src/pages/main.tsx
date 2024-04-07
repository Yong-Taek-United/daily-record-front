import { setContext } from '@/api/authInterceptorWithSSR';
import { getCalendarData } from '@/api/calendar/calendar';
import { ActivityType, CalendarDataType } from '@/types/calendar';
import { Event as RCBEvent } from 'react-big-calendar';
import { GetServerSidePropsContext } from 'next';
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
    let events: CalendarEvent[] = CalendarData.flatMap((data) =>
      data.activities.map((activity) => ({
        id: activity.id,
        title: activity.title,
        start: new Date(activity.actedDate + 'T' + activity.actedTime),
        end: new Date(activity.actedDate + 'T' + activity.actedTime),
        resource: activity,
      }))
    );

    return events;
  };

  return (
    <main className="w-full h-screen bg-gray-50">
      <Header />

      <div className="w-full lg:flex lg:justify-between h-2/3 sm:h-4/5  p-3 mt-4">
        <div className="w-full h-full bg-white">
          <MyCalendar
            components={{ toolbar: Toolbar }}
            defaultDate={new Date(`${year}-${month}`)}
            events={formatCalendarData(activities)}
          />
        </div>

        {/* <div className="hidden lg:block bg-red-200 lg:ml-4 w-32">gd</div> */}
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
