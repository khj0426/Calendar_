import { Schedule } from "../../types/schedule";
export const ScheduleDetailModal = ({ title, ...rest }: Schedule) => {
  return (
    <div aria-label="schedule-detail-modal" className="h-full">
      <div className="flex flex-col gap-4 p-8 z-10 bg-[#dde3ea] w-[424px] h-[240px] rounded-lg shadow-lg fixed overflow-x-hidden overflow-y-scroll top-30 left-1/2 transform -translate-x-1/2">
        {title}
      </div>
    </div>
  );
};
