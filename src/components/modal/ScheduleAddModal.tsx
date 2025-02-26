import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoCloseOutline } from "react-icons/io5";
import { useBoolean } from "../../hooks/use-boolean";
import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { closeModal } from "../../reducers/modal-slice";
import { getSplitHoursToStringFormat } from "../../utils/date";
import { Button } from "../common/Button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { addschedule } from "../../reducers/schedule-list-slice";

export const ScheduleAddModal = () => {
  const dispatch = useAppDispatch();
  const initalSelectedDate = useAppSelector((state) => state.calendar.date);
  const [scheduleTitle, setScheduleTitle] = useState("제목 없음");
  const allTimes = getSplitHoursToStringFormat();
  const [scheduleTime, setScheduleTime] = useState({ start: "", end: "" });

  const getFilteredEndTimes = () => {
    const startTimeIndex = allTimes.indexOf(scheduleTime.start);
    return allTimes.slice(startTimeIndex + 1);
  };

  const {
    value: isCalendarOpen,
    toggleValue: toggleCalendarOpen,
    setFalse: closeCalendar,
  } = useBoolean();
  const [selectedDate, setSelectDate] = useState<string>(initalSelectedDate);

  return (
    <div aria-label="schedule-add-modal" className="h-full">
      <div className="flex flex-col gap-4 p-6 z-10 bg-white w-[480px] h-auto rounded-lg shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300">
        <div
          className="flex w-full justify-end cursor-pointer"
          onClick={() =>
            dispatch(closeModal({ modalType: "ScheduleAddModal" }))
          }
        >
          <IoCloseOutline
            size={24}
            className="hover:bg-gray-200 hover:rounded-md"
          />
        </div>
        <input
          onFocus={() => closeCalendar()}
          onChange={(e) => setScheduleTitle(e.target.value)}
          placeholder="제목 추가"
          type="text"
          className="block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-xl p-2"
        />

        <div className="flex items-center gap-4">
          <input
            onChange={(e) => setSelectDate(e.target.value)}
            value={selectedDate}
            className="text-gray-800 placeholder-gray-400 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full p-2"
            onClick={toggleCalendarOpen}
            placeholder={format(new Date(), "yyyy-MM-dd")}
          />
          {isCalendarOpen && (
            <div className="absolute z-20 h-[350px]">
              <DayPicker
                locale={ko}
                onDayClick={(day) => {
                  setSelectDate(format(day, "yyyy-MM-dd"));
                  closeCalendar();
                }}
                today={new Date(initalSelectedDate)}
                classNames={{
                  root: "bg-white w-[315px] p-2 shadow-lg rounded-lg",
                  selected: "text-blue-500",
                  today: "text-blue-500",
                  day: "cursor-pointer w-[16px] h-[16px] p-[12px] hover:text-blue-300",
                }}
              />
            </div>
          )}
          <select
            className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full p-2"
            onFocus={() => closeCalendar()}
            value={scheduleTime.start}
            onChange={(e) => {
              setScheduleTime({
                start: e.target.value,
                end: allTimes.slice(allTimes.indexOf(e.target.value))[1],
              });
            }}
          >
            {allTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <select
            value={scheduleTime.end}
            className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full p-2"
            onFocus={() => closeCalendar()}
            onChange={(e) => {
              setScheduleTime({
                ...scheduleTime,
                end: e.target.value,
              });
            }}
          >
            {getFilteredEndTimes().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end w-full pr-1 mt-4">
          <Button
            className="text-gray-700 h-[40px] w-[54px] bg-white hover:bg-gray-100 rounded-md text-sm font-medium"
            onClick={() =>
              dispatch(closeModal({ modalType: "ScheduleAddModal" }))
            }
          >
            취소
          </Button>
          <Button
            className="text-white ml-2 bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm h-[40px] w-[54px] text-center"
            onClick={() => {
              dispatch(
                addschedule({
                  id:
                    selectedDate +
                    scheduleTitle +
                    scheduleTime.start +
                    scheduleTime.end,
                  startTime: scheduleTime.start ?? allTimes[0],
                  endTime:
                    scheduleTime.end.length !== 0
                      ? scheduleTime.end
                      : getFilteredEndTimes()[0],
                  date: selectedDate,
                  title: scheduleTitle,
                })
              );
              dispatch(closeModal({ modalType: "ScheduleAddModal" }));
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};
