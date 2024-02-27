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

// 受け取った日付からn日前の日付を取得する
const getDaysAgo = (date: string, index: number) => {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() - index);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  return `${year}/${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day}`;
};

//上記の関数を使って、n日前の日付を配列にして返す
export const createDaysAgoArray = (dateLength: number) => {
  return Array.from({ length: dateLength }, (_, i) =>
    getDaysAgo(new Date().toISOString(), i),
  );
};

// 取得した日付の月初と月末を取得
export const getBeginAndEndOfMonth = (
  date: Date,
): { beginMonth: string; endMonth: string } => {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  return {
    beginMonth: `${year}/${month < 10 ? "0" + month : month}/01`,
    endMonth: `${year}/${month < 10 ? "0" + month : month}/${getMonthEnd(year, month)}`,
  };
};
