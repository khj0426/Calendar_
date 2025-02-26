import { addDays, eachHourOfInterval, format, getDay, subDays } from "date-fns";
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

  const subDaysRange = Array.from({ length: startDayofWeek }).map((_, i) => {
    return format(subDays(date, startDayofWeek - i), "dd");
  });

  const addDaysRange = Array.from(
    { length: WEEK_LIST.length - startDayofWeek },
    (_, i) => {
      return format(addDays(date, i), "dd");
    }
  );

  return [...subDaysRange, ...addDaysRange];
};

export const getSplitHours = () => {
  const resultOfSplit = eachHourOfInterval({
    start: new Date(2025, 2, 26, 0),
    end: new Date(2025, 2, 26, 24),
  });

  return resultOfSplit.map((hour) => Number(format(hour, "HH")));
};

export const fotmatHourToAmorPmString = (hour: number) => {
  if (hour < 12) {
    return `오전 ${hour}시`;
  } else {
    return `오후 ${hour}시`;
  }
};
