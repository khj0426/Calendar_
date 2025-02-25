import { SidebarLayer } from "./components/sidebar/SidebarLayer";
import { WeeklyCalendar } from "./components/calendar/WeeklyCalendar";
function App() {
  return (
    <div className="flex gap-5 mt-1.5 justify-between w-full">
      <SidebarLayer />
      <WeeklyCalendar />
    </div>
  );
}

export default App;
