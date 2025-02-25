import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { parseISO } from "date-fns";

import "react-day-picker/style.css";
import "./sidebar-day-picker.css";

import { useAppSelector, useAppDispatch } from "../../hooks/use-redux";
import { setDateReducer } from "../../reducers/calendar-slice";

export const SidebarCalendar = () => {
  const selectedDate = useAppSelector((state) => state.calendar.date);
  const dispatch = useAppDispatch();
  console.log(selectedDate);

  return (
    <DayPicker
      onSelect={(date) => {
        if (date) {
          dispatch(setDateReducer(date));
        }
      }}
      locale={ko}
      selected={parseISO(selectedDate)}
      captionLayout="label"
      mode="single"
      aria-label="sidebar-calendar"
      showOutsideDays
      classNames={{
        day: "w-[8px] h-[8px] p-[8px]",
        day_button: "w-[8px] h-[8px] p-[8px] cursor-pointer",
        button_next: "text-gray-200",
        button_previous: "text-gray-200",
        nav: "absolute inset-y-0 right-0 flex items-center h-[2.75rem] gap-2",
        selected: `text-blue-500`,
      }}
    />
  );
};
