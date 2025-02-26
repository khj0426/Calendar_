import { Button } from "../common/Button";
import { FiPlus } from "react-icons/fi";

import { useAppDispatch } from "../../hooks/use-redux";
import { openModal } from "../../reducers/modal-slice";

import { SidebarCalendar } from "../calendar/SidebarCalendar";

interface SidebarLayerProps {
  isOpen: boolean;
}
export const SidebarLayer = ({ isOpen }: SidebarLayerProps) => {
  const dispatch = useAppDispatch();
  if (isOpen) {
    return (
      <nav className="h-[100vh] flex flex-col gap-2.5 w-[248px] mt-1.5">
        <Button
          startIcon={<FiPlus size={25} />}
          onClick={() => {
            dispatch(
              openModal({
                modalType: "ScheduleAddModal",
              })
            );
          }}
        >
          만들기
        </Button>
        <SidebarCalendar />
      </nav>
    );
  }
  return <nav></nav>;
};
