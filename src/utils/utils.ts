type SaveDataTypes<T> = T;

export function saveDataInLocalStorage<T>(key: string, data: T) {
  return localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorage(key: string) {
  const data = typeof window !== 'undefined' && localStorage.getItem(key);
  if (typeof data === 'string') {
    return JSON.parse(data);
  } else return null;
}

export function deleteLocalStorageData(key: string) {
  localStorage.removeItem(key);
}

// 두 날짜 간 총 일수 계산
export function calculateDaysBetween(date1: string, date2: string) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());

  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  // 기간 총 일수 반환
  return diffInDays + 1;
}

// 두 날짜 간 주말 일수 계산
export function countWeekendsBetween(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;

  for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
    let dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // 0: Sunday, 6: Saturday
      count++;
    }
  }

  return count;
}

// 주기
export const convertCycleToKorean = (
  cycleType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
) => {
  switch (cycleType) {
    case 'DAY':
      return '하루';
    case 'WEEK':
      return '일주일';
    case 'MONTH':
      return '한 달';
    case 'YEAR':
      return '일 년';
    default:
      return '';
  }
};
