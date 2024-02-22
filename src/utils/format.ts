// DateをJSTに統一する
export const formattedDateByja = (date: string | Date): string => {
  if (date instanceof Date) {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  const isodate = new Date(date);
  const formattedDate = isodate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
