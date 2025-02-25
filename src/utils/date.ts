import { addDays, format, getDay, subDays } from "date-fns";
import { ko } from "date-fns/locale";
import { WEEK_LIST } from "../constants";

export const renderCalendarCaptionYearMonth = ({ date }: { date: Date }) => {
  const year = format(date, "yyyy");
  const month = format(date, "MMMM", {
    locale: ko,
  });
  return `${year}년 ${month}월`;
};

export const getDateRange = ({ date }: { date: Date }) => {
  const startDayofWeek = getDay(date);

  const subDaysRange = Array.from({ length: startDayofWeek + 1 }).map(
    (_, i) => {
      return format(subDays(date, startDayofWeek - i), "dd");
    }
  );

  const addDaysRange = Array.from(
    { length: WEEK_LIST.length - startDayofWeek - 1 },
    (_, i) => {
      return format(addDays(date, i), "dd");
    }
  );

  return [...subDaysRange, ...addDaysRange];
};
