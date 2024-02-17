export const formattedDate = (date: string): string => {
  const isodate = new Date(date);
  const formattedDate = isodate.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
