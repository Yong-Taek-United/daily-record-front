import { AxiosResponse } from 'axios';
import { instanceSSR } from '../authInterceptorWithSSR';
import { CalendarDataType } from '@/types/calendar';

export async function getCalendarData({
  year,
  month,
}: {
  year: string;
  month: string;
}): Promise<AxiosResponse<{ data: CalendarDataType[] }, any>> {
  return await instanceSSR.get(`/activities/list/${year}/${month}`);
}
