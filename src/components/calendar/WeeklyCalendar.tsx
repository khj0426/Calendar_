import { useAppSelector } from "../../hooks/use-redux";
import {
  getDateRange,
  getSplitHours,
  fotmatHourToAmorPmString,
  convertTimeToMinutes,
} from "../../utils/date";

import { format, isSameDay } from "date-fns";

import { WEEK_LIST } from "../../constants";

export const WeeklyCalendar = () => {
  const selectedDate = useAppSelector((state) => state.calendar.date);
  const allScheduleList = useAppSelector((state) => state.schedule);

  console.log(allScheduleList);
  return (
    <div className="grid grid-cols-8 gap-1 w-full bg-white p-6 border-2 border-gray-300 rounded-[28px] m-1.5">
      <div className="flex flex-col items-center mt-[111px] position-absolue">
        {getSplitHours().map((hour, index) => (
          <div
            className="w-full flex justify-center h-[53px] text-[#444746] text-[12px]"
            key={index}
          >
            {hour === 0 ? "" : fotmatHourToAmorPmString(hour)}
          </div>
        ))}
      </div>
      {getDateRange({
        date: new Date(selectedDate),
      }).map((day, index) => (
        <div className="flex flex-col items-center" key={index}>
          <p className="text-[11px] text-[#444746] mb-0.5">
            {WEEK_LIST[index]}
          </p>
          <p className="text-[26px] text-[#444746]">
            {format(new Date(day), "dd")}
          </p>
          {getSplitHours().map((_hour, hourIndex) => {
            const activeScheduleListFilteredByHour = allScheduleList.filter(
              (schedule) =>
                convertTimeToMinutes(schedule.startTime) < (_hour + 1) * 60 &&
                convertTimeToMinutes(schedule.endTime) > _hour * 60 &&
                isSameDay(new Date(schedule.date), new Date(day))
            );

            return (
              <div
                className="border-x-[1px] border-x-[#dde3ea] w-full h-[53px] border-b-[#dde3ea] border-b-[1px]"
                key={hourIndex}
              >
                {activeScheduleListFilteredByHour.map((v) => (
                  <div>{v.title}</div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
