import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const renderCalendarCaptionYearMonth = ({ date }: { date: Date }) => {
  const year = format(date, "yyyy");
  const month = format(date, "MMMM", {
    locale: ko,
  });
  return `${year}년 ${month}월`;
};
