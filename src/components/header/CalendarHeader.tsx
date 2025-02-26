import { FaAlignLeft } from "react-icons/fa";
import { Button } from "../common/Button";

import {
  setDateReducer,
  shiftToNextWeekReducer,
  shiftToPrevWeekReducer,
} from "../../reducers/calendar-slice";
import { useAppDispatch } from "../../hooks/use-redux";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

interface CalendarHeaderProps {
  toggleSidebar: () => void;
}

export const CalendarHeader = ({ toggleSidebar }: CalendarHeaderProps) => {
  const dispatch = useAppDispatch();
  return (
    <header className="w-full h-[48px] bg-[#f8fafd] flex items-center mt-2.5">
      <div className="px-4 flex gap-4 items-center ml-4">
        <FaAlignLeft
          size={25}
          onClick={toggleSidebar}
          className="cursor-pointer"
        />
        <h2 className="text-[#1f1f1f] text-[22px]">Calendar</h2>
      </div>

      <div>
        <Button
          className="ml-6 w-[74px] border-[1px]"
          onClick={() => dispatch(setDateReducer(new Date()))}
        >
          오늘
        </Button>
      </div>

      <div className="flex items-center gap-4 ml-8 cursor-pointer">
        <FaAngleLeft onClick={() => dispatch(shiftToPrevWeekReducer())} />
        <FaAngleRight onClick={() => dispatch(shiftToNextWeekReducer())} />
      </div>
    </header>
  );
};
