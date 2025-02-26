import { Button } from "../common/Button";
import { FiPlus } from "react-icons/fi";

import { SidebarCalendar } from "../calendar/SidebarCalendar";

interface SidebarLayerProps {
  isOpen: boolean;
}
export const SidebarLayer = ({ isOpen }: SidebarLayerProps) => {
  if (isOpen) {
    return (
      <nav className="h-[100vh] flex flex-col gap-2.5 w-[248px] mt-1.5">
        <Button startIcon={<FiPlus size={25} />}>만들기</Button>
        <SidebarCalendar />
      </nav>
    );
  }
  return <nav></nav>;
};
