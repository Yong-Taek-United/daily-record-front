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

export function calculateDaysBetween(date1: string, date2: string) {
  // Parse the dates and create Date objects
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());

  // Convert milliseconds to days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
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

// // 두 날짜 간 주말 일수 계산
// function calculateWeekendsBetweenDates(
//   startDate: Date,
//   totalDays: number
// ): number {
//   const weekends = Array.from({ length: totalDays }, (_, index) => {
//     const date = new Date(
//       startDate.getTime() + index * 24 * 60 * 60 * 1000
//     );
//     return date.getDay() === 0 || date.getDay() === 6 ? 1 : 0;
//   }).reduce((acc, day) => acc + day, 0);

//   return weekends;
// }
