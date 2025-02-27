import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "../common/Button";
import {
  setDateReducer,
  shiftToNextMonthReducer,
  shiftToNextWeekReducer,
  shiftToPrevMonthReducer,
  shiftToPrevWeekReducer,
} from "../../reducers/calendar-slice";
import { useAppDispatch } from "../../hooks/use-redux";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

interface CalendarHeaderProps {
  toggleSidebar: () => void;
  setMontlyCalendarOpen: () => void;
  setWeeklyCalendarOpen: () => void;
  calendarType: "week" | "month";
}

export const CalendarHeader = ({
  toggleSidebar,
  setWeeklyCalendarOpen,
  setMontlyCalendarOpen,
  calendarType,
}: CalendarHeaderProps) => {
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCalendarTypeChange = (type: "week" | "month") => {
    if (type === "week") {
      setWeeklyCalendarOpen();
    } else {
      setMontlyCalendarOpen();
    }
    setDropdownOpen(false);
  };

  return (
    <header className="w-full h-auto bg-[#f8fafd] flex flex-wrap items-center border-b border-gray-300">
      <div className="px-4 flex gap-1.5 items-center">
        <div className="hover:bg-gray-300 cursor-pointer font-medium p-2 rounded-3xl">
          <GiHamburgerMenu size={25} onClick={toggleSidebar} />
        </div>
        <img
          src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_27_2x.png"
          alt="calendarImage"
          className="w-[40px] h-[40px] object-contain md:inline hidden"
        />
        <h2 className="text-[#1f1f1f] text-[22px] flex items-center">
          Calendar
        </h2>
      </div>

      <div>
        <Button
          className="ml-6 w-[74px] border-[1px] h-[32px]"
          onClick={() => dispatch(setDateReducer(new Date().toISOString()))}
        >
          오늘
        </Button>
      </div>

      <div className="flex items-center gap-4 ml-8 cursor-pointer h-full">
        <div className="hover:bg-gray-300 rounded-2xl p-4">
          <FaAngleLeft
            onClick={() => {
              if (calendarType === "week") {
                dispatch(shiftToPrevWeekReducer());
              } else {
                dispatch(shiftToPrevMonthReducer());
              }
            }}
          />
        </div>
        <div className="hover:bg-gray-300 rounded-2xl p-4">
          <FaAngleRight
            onClick={() => {
              if (calendarType === "week") {
                dispatch(shiftToNextWeekReducer());
              } else {
                dispatch(shiftToNextMonthReducer());
              }
            }}
          />
        </div>
      </div>

      <div className="relative ml-auto mr-4">
        <Button
          className="ml-6 w-[74px] border-[1px] h-[32px] bg-blue-500 text-white"
          onClick={handleDropdownToggle}
        >
          {calendarType === "week" ? "주" : "월"}
        </Button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
            <Button
              className="text-left p-2 hover:bg-gray-200 border-none w-[144px] h-[36px] rounded-none flex justify-start text-[#374151]"
              onClick={() => handleCalendarTypeChange("week")}
            >
              주
            </Button>
            <Button
              className="w-[144px] h-[36px] text-left p-2 hover:bg-gray-200 border-none rounded-none flex justify-start text-[#374151]"
              onClick={() => handleCalendarTypeChange("month")}
            >
              월
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};
