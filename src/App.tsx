import { CalendarHeader } from "./components/header/CalendarHeader";
import { SidebarLayer } from "./components/sidebar/SidebarLayer";
import { WeeklyCalendar } from "./components/calendar/WeeklyCalendar";
import { MontlyCalendar } from "./components/calendar/MontlyCalendar";

import { useBoolean } from "./hooks/use-boolean";
function App() {
  const { value: isSidebarOpen, toggleValue: toggleSidebar } = useBoolean();
  const {
    value: isMontlyCalendarOpen,
    setTrue: openMontlyCalendar,
    setFalse: openWeeklyCalendar,
  } = useBoolean();

  return (
    <div className="flex flex-col">
      <CalendarHeader
        toggleSidebar={toggleSidebar}
        setWeeklyCalendarOpen={openWeeklyCalendar}
        setMontlyCalendarOpen={openMontlyCalendar}
      />
      <div className="flex gap-5 mt-1.5 w-full flex-col md:flex-row">
        <SidebarLayer isOpen={isSidebarOpen} />
        {!isMontlyCalendarOpen ? <WeeklyCalendar /> : <MontlyCalendar />}
      </div>
    </div>
  );
}

export default App;
