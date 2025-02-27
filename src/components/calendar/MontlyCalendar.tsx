import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { isSameDay } from "date-fns";
import { openModal } from "../../reducers/modal-slice";
import { setActiveSchedule } from "../../reducers/active-schedule";
import { setDateReducer } from "../../reducers/calendar-slice";

export const MontlyCalendar = () => {
  const dispatch = useAppDispatch();
  const initalActiveDate = useAppSelector((state) => state.calendar.date);
  const allScheduleList = useAppSelector((state) => state.schedule);

  return (
    <div className="w-full bg-white rounded-[28px] m-1.5 flex justify-center md:p-4 border-2 border-gray-100 table-fixed">
      <DayPicker
        onDayClick={() => {}}
        locale={ko}
        components={{
          Day: ({ day }) => {
            const activeScheduleListFilteredByDate = allScheduleList.filter(
              (schedule) => isSameDay(new Date(schedule.date), day.date)
            );
            const hasScheduleInDay =
              activeScheduleListFilteredByDate.length > 0;

            return (
              <div
                className={`table-cell w-[56px] h-[56px] md:w-[260px] md:h-[240px] align-baseline box-border border-[1px] border-gray-300 text-[#1f1f1f] text-[12px]`}
                onClick={() => {
                  dispatch(setDateReducer(day.date.toISOString()));
                  if (hasScheduleInDay) {
                    dispatch(
                      setActiveSchedule(activeScheduleListFilteredByDate[0])
                    );
                    dispatch(
                      openModal({
                        modalType: "ScheduleDetailModal",
                      })
                    );
                  } else {
                    dispatch(
                      openModal({
                        modalType: "ScheduleAddModal",
                      })
                    );
                  }
                }}
              >
                {day.date.getDate()}
                {activeScheduleListFilteredByDate.map((schedule, index) => (
                  <h1
                    key={index}
                    className="w-full h-[22px] bg-sky-600 text-white text-[12px] p-1 rounded-md mb-1 flex align-middle justify-center overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {schedule.title}
                  </h1>
                ))}
              </div>
            );
          },
        }}
        defaultMonth={new Date(initalActiveDate)}
        hideNavigation
      />
    </div>
  );
};
