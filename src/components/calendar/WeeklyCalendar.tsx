import { useAppSelector, useAppDispatch } from "../../hooks/use-redux";
import {
  getDateRange,
  getSplitHours,
  fotmatHourToAmorPmString,
  convertTimeToMinutes,
} from "../../utils/date";

import { format, isSameDay } from "date-fns";

import { WEEK_LIST } from "../../constants";
import { openModal } from "../../reducers/modal-slice";
import { setDateReducer } from "../../reducers/calendar-slice";
import { setActiveSchedule } from "../../reducers/active-schedule";

export const WeeklyCalendar = () => {
  const selectedDate = useAppSelector((state) => state.calendar.date);
  const allScheduleList = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();
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
        <div className="flex flex-col items-center relative" key={index}>
          <p className="md:text-[11px] text-[#444746] mb-0.5 text-[8px]">
            {WEEK_LIST[index]}
          </p>
          <p className="md:text-[26px] text-[#444746] text-[18px]">
            {format(new Date(day), "dd")}
          </p>
          {getSplitHours().map((_hour, hourIndex) => {
            const activeScheduleListFilteredByHour = allScheduleList.filter(
              (schedule) => {
                const startTimeInMinutes = convertTimeToMinutes(
                  schedule.startTime
                );
                const endTimeInMinutes = convertTimeToMinutes(schedule.endTime);

                if (schedule.isRepeat) {
                  return (
                    startTimeInMinutes >= _hour * 60 &&
                    endTimeInMinutes >= _hour * 60
                  );
                } else {
                  return (
                    startTimeInMinutes >= _hour * 60 &&
                    endTimeInMinutes >= _hour * 60 &&
                    isSameDay(new Date(schedule.date), new Date(day))
                  );
                }
              }
            );

            return (
              <div
                className={`border-x-[1px] border-x-[#dde3ea] w-full h-[53px] border-b-[#dde3ea] border-b-[1px]`}
                key={hourIndex}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setDateReducer(day));
                  dispatch(
                    openModal({
                      modalType: "ScheduleAddModal",
                    })
                  );
                }}
              >
                {activeScheduleListFilteredByHour.map((v) => {
                  const startMinutes = convertTimeToMinutes(v.startTime);
                  const endMinutes = convertTimeToMinutes(v.endTime);
                  const totalMinutesInHour = 60;
                  const totalHeight = 53;
                  const height =
                    ((endMinutes - startMinutes) / totalMinutesInHour) *
                    totalHeight;
                  const top = (startMinutes / totalMinutesInHour) * totalHeight;

                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setActiveSchedule(v));
                        dispatch(
                          openModal({
                            modalType: "ScheduleDetailModal",
                          })
                        );
                      }}
                      key={v.id}
                      style={{
                        position: "absolute",
                        top: `${top + 110}px`,
                        height: `${height}px`,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 123, 255, 0.2)",
                        border: "1px solid rgba(0, 123, 255, 0.5)",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {v.title}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
