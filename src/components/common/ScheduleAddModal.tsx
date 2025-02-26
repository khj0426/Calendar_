import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { IoCloseOutline } from "react-icons/io5";
import { useBoolean } from "../../hooks/use-boolean";
import { useAppDispatch } from "../../hooks/use-redux";
import { closeModal } from "../../reducers/modal-slice";
import { getSplitHoursToStringFormat } from "../../utils/date";

import { Button } from "./Button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { addschedule } from "../../reducers/schedule-slice";

export const ScheduleAddModal = () => {
  const dispatch = useAppDispatch();

  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleTime, setScheduleTime] = useState({
    start: "",
    end: "",
  });
  const {
    value: isCalendarOpen,
    toggleValue: toggleCalendarOpen,
    setFalse: closeCalendar,
  } = useBoolean();
  const [selectedDate, setSelectDate] = useState<string>("");

  const allTimes = getSplitHoursToStringFormat();

  const getFilteredEndTimes = () => {
    const startTimeIndex = allTimes.indexOf(scheduleTime.start);
    return allTimes.slice(startTimeIndex + 1);
  };

  return (
    <div aria-label="schedule-add-modal" className="h-full">
      <div className="flex flex-col gap-4 p-8 z-10 bg-[#dde3ea] w-[480px] h-[554px] rounded-lg shadow-lg fixed overflow-x-hidden overflow-y-scroll top-30 left-1/2 transform -translate-x-1/2">
        <div
          className="flex w-full justify-end cursor-pointer"
          onClick={() =>
            dispatch(
              closeModal({
                modalType: "ScheduleAddModal",
              })
            )
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
          className="block w-full border-0 text-2xl border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse"
        />

        <div className="">
          <input
            value={selectedDate}
            className="text-[#1f1f1f] placeholder-[#1f1f1f] border-0 border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse"
            onClick={toggleCalendarOpen}
            placeholder={format(new Date(), "yyyy-MM-dd")}
          />
          {isCalendarOpen && (
            <DayPicker
              locale={ko}
              onDayClick={(day) => {
                setSelectDate(format(day, "yyyy-MM-dd"));
                closeCalendar();
              }}
              classNames={{
                root: "bg-white w-[315px] p-2 fixed",
                selected: "text-blue-500",
                today: "text-blue-500",
                day: "cursor-pointer w-[16px] h-[16px] p-[12px] cursor-pointer hover:text-blue-300",
              }}
            />
          )}
          <select
            className="border-0 border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse"
            onFocus={() => {
              closeCalendar();
            }}
            onChange={(e) => {
              setScheduleTime({
                ...scheduleTime,
                start: e.target.value,
                end: "",
              });
            }}
          >
            {allTimes.map((time) => (
              <option value={time}>{time}</option>
            ))}
          </select>
          <select
            className="border-0 border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse ml-12"
            onFocus={() => {
              closeCalendar();
            }}
            onChange={(e) => {
              setScheduleTime({
                ...scheduleTime,
                end: e.target.value,
              });
            }}
          >
            {getFilteredEndTimes().map((time) => (
              <option value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end w-full pr-1">
          <Button
            onClick={() =>
              dispatch(
                closeModal({
                  modalType: "ScheduleAddModal",
                })
              )
            }
          >
            취소
          </Button>
          <Button
            onClick={() => {
              dispatch(
                addschedule({
                  id:
                    selectedDate +
                    scheduleTitle +
                    scheduleTime.start +
                    scheduleTime.end,
                  startTime: scheduleTime.start,
                  endTime: scheduleTime.end,
                  date: selectedDate,
                  title: scheduleTitle,
                })
              );
              dispatch(
                closeModal({
                  modalType: "ScheduleAddModal",
                })
              );
            }}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};
