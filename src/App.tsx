import { CalendarHeader } from "./components/header/CalendarHeader";
import { SidebarLayer } from "./components/sidebar/SidebarLayer";
import { WeeklyCalendar } from "./components/calendar/WeeklyCalendar";

import { useBoolean } from "./hooks/use-boolean";
function App() {
  const { value: isSidebarOpen, toggleValue: toggleSidebar } = useBoolean();

  return (
    <div className="flex flex-col">
      <CalendarHeader toggleSidebar={toggleSidebar} />
      <div className="flex gap-5 mt-1.5 w-full flex-col md:flex-row">
        <SidebarLayer isOpen={isSidebarOpen} />
        <WeeklyCalendar />
      </div>
    </div>
  );
}

export default App;
