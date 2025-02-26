import { useState } from "react";
import { DayPicker } from "react-day-picker";

import { IoCloseOutline } from "react-icons/io5";

import { useBoolean } from "../../hooks/use-boolean";
import { useAppDispatch } from "../../hooks/use-redux";
import { closeModal } from "../../reducers/modal-slice";

import { format } from "date-fns";

import { ko } from "date-fns/locale";

export const ScheduleAddModal = () => {
  const [scheduleTitle, setScheduleTitle] = useState("");
  const {
    value: isCalendarOpen,
    toggleValue: toggleCalendarOpen,
    setFalse: closeCalendar,
  } = useBoolean();
  const [selectedDate, setSelectDate] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <div aria-label="schedule-add-modal" className="h-full">
      <div
        className="
      flex flex-col gap-4 p-8 bg-[#dde3ea] w-[480px] h-[554px] rounded-lg shadow-lg fixed overflow-x-hidden overflow-y-scroll top-30 left-1/2 transform -translate-x-1/2"
      >
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
          onChange={(e) => setScheduleTitle(e.target.value)}
          placeholder="제목 추가"
          type="text"
          className="block w-full border-0 text-2xl border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse"
        />

        <div>
          <input
            value={selectedDate}
            className="text-[#1f1f1f] placeholder-[#1f1f1f] border-0 border-blue-600 focus:outline-none focus:border-b-2 focus:animate-pulse"
            onClick={toggleCalendarOpen}
            placeholder={format(new Date().toDateString(), "yyyy-MM-dd")}
          />
          {isCalendarOpen && (
            <DayPicker
              locale={ko}
              onDayClick={(day) => {
                setSelectDate(format(day, "yyyy-MM-dd"));
                closeCalendar();
              }}
              classNames={{
                root: "bg-white w-[315px] p-2",
                selected: "text-blue-500",
                today: "text-blue-500",
                day: "cursor-pointer w-[16px] h-[16px] p-[12px] cursor-pointer hover:text-blue-300",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
