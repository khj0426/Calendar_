import { useAppSelector, useAppDispatch } from "../../hooks/use-redux";
import { closeModal } from "../../reducers/modal-slice";
import { removeschedule } from "../../reducers/schedule-list-slice";

export const ScheduleDetailModal = () => {
  const dispatch = useAppDispatch();
  const activeSchedule = useAppSelector((state) => state.activeSchedule);

  return (
    <div aria-label="schedule-detail-modal" className="h-full">
      <div className="flex flex-col gap-4 p-6 z-10 bg-white w-[400px] h-auto rounded-lg shadow-lg fixed overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">
          {activeSchedule.title}
        </h2>
        <div className="text-sm text-gray-600">
          <p>
            <strong>시작 시간:</strong> {activeSchedule.startTime}
          </p>
          <p>
            <strong>종료 시간:</strong> {activeSchedule.endTime}
          </p>
          <p>
            <strong>날짜:</strong>{" "}
            {new Date(activeSchedule.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ml-2"
            onClick={() => {
              dispatch(
                closeModal({
                  modalType: "ScheduleDetailModal",
                })
              );
              dispatch(removeschedule(activeSchedule.id));
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
