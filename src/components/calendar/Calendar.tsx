import moment from 'moment';
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import Toolbar from './Toolbar';
import 'moment/locale/ko';

moment.locale('ko');
const localizer = momentLocalizer(moment);

export default function MyCalendar(props: Omit<CalendarProps, 'localizer'>) {
  return (
    <Calendar
      components={{
        toolbar: Toolbar,
      }}
      view={'month'}
      localizer={localizer}
      events={props.events}
      startAccessor="start"
      endAccessor="end"
      messages={{
        showMore: (count) => `+${count}`,
      }}
    />
  );
}
