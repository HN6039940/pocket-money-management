// うるう年判定
export const isLeapYear = (year: number) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};

// 曜日を取得
export const getDayofWeek = (date: string) => {
  const dayOfWeek = new Date(date).getDay();
  const dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"];
  return dayOfWeekStr[dayOfWeek];
};

// 月末日を取得
export const getLastDateofMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

// 31日以外の月の月末日を取得
export const getMonthEnd = (year: number, month: number) => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30;
  }
  return 31;
};

// 現在の日付も含めて7日前の日付を取得するただし1～6日の場合は前月の月末日を含めて7日前の日付を取得する
// 更に1月の場合は前年の12月を含めて7日前の日付を取得する
// 更にうるう年の場合は2月29日を含めて7日前の日付を取得する
// 例：2024年3月1日の場合は2024年2月24日まで取得する

// export const get7DaysAgo = (date: string) => {
//   const targetDate = new Date(date);
//   const year = targetDate.getFullYear();
//   const month = targetDate.getMonth() + 1;
//   const day = targetDate.getDate();
//   const isLeap = isLeapYear(year);

//   if (day <= 7) {
//     if (month === 1) {
//       return `${year - 1}-${12}-${getMonthEnd(year - 1, 12) - (7 - day)}`;
//     }
//     if (month === 3 && isLeap) {
//       return `${year}-${month - 1}-${29 - (7 - day)}`;
//     } else {
//       return `${year}-${month - 1}-${getMonthEnd(year, month - 1) - (7 - day)}`;
//     }
//   } else {
//     return `${year}-${month}-${day - 7}`;
//   }
// };

const get7DaysAgo = (date: string, index: number) => {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() - index);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  return `${year}/${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}`;
};

export const getBeginAndEndOfMonth = (date: string) => {
  const targetDate = new Date(date);
  const beginMonth = targetDate.setDate(1);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const endMonth = targetDate.setDate(getMonthEnd(year, month));
  return {
    beginMonth: `${year}/${month < 10 ? "0" + month : month}/01`,
    endMonth: `${year}/${month < 10 ? "0" + month : month}/${getMonthEnd(year, month)}`,
  };
};
