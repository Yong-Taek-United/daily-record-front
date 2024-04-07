import moment from 'moment';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import 'moment/locale/ko';
import { CSSProperties } from 'react';
import { CalendarEvent } from '@/pages/main';

moment.locale('ko');
const localizer = momentLocalizer(moment);

export default function MyCalendar(props: Omit<CalendarProps, 'localizer'>) {
  // 이벤트 스타일 변경
  const customEventPropGetter = (event: CalendarEvent) => {
    let newStyle: CSSProperties = {
      backgroundColor: 'lightblue',
      color: 'black',
      border: 'none',
    };

    if (event.resource?.task?.color?.colorCode) {
      newStyle.backgroundColor = `#${event.resource.task.color.colorCode}`;
    }

    return {
      style: newStyle,
    };
  };

  return (
    <Calendar
      {...props}
      view={'month'}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      messages={{
        showMore: (count) => `+${count}`,
      }}
      eventPropGetter={(event) => customEventPropGetter(event as CalendarEvent)}
      onView={(view) => null}
    />
  );
}
