import { useAppDispatch, useAppSelector } from "../../hooks/use-redux";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { removeschedule } from "../../reducers/schedule-list-slice";
import { closeModal } from "../../reducers/modal-slice";

import { ko } from "date-fns/locale";
import { Button } from "../common/Button";
import { format } from "date-fns";

import { formatHourMinuteToAmorPmString } from "../../utils/date";

export const ScheduleDetailModal = () => {
  const dispatch = useAppDispatch();
  const activeSchedule = useAppSelector((state) => state.activeSchedule);
  return (
    <>
      <div
        className={`overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center md:inset-0 h-modal sm:h-full h-screen`}
        id="medium-modal"
      >
        <div className="relative px-4 w-full max-w-lg h-full md:h-auto mx-auto mt-64">
          <div className="relative bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="grid grid-cols-10 p-2 rounded-t">
              <Button
                type="button"
                className="col-start-9 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-[45px] h-[45px] ml-auto inline-flex items-center border-none"
                data-modal-toggle="medium-modal"
                onClick={() => {
                  dispatch(removeschedule(activeSchedule.id));
                  dispatch(
                    closeModal({
                      modalType: "ScheduleDetailModal",
                    })
                  );
                }}
              >
                <BiTrash className="text-base" />
              </Button>
              <Button
                type="button"
                className="col-start-10 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-[45px] h-[45px] text-sm ml-auto inline-flex items-center border-none"
                data-modal-toggle="medium-modal"
                onClick={() => {
                  dispatch(
                    closeModal({
                      modalType: "ScheduleDetailModal",
                    })
                  );
                }}
              >
                <IoCloseOutline size={24} />
              </Button>
            </div>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-10">
                <div className="col-span-1 text-center mt-2 ml-2">
                  <MdOutlineCheckBoxOutlineBlank
                    style={{
                      color: "blue",
                      background: "blue",
                    }}
                  />
                </div>

                <h3 className="col-span-9 font-semibold text-xl truncate">
                  {activeSchedule.title}
                </h3>
                <div className="col-start-2 col-span-9 text-gray-600 text-sm mt-2">
                  {format(new Date(activeSchedule.date), "yyyy년 M월 d일 (E)", {
                    locale: ko,
                  })}{" "}
                  {formatHourMinuteToAmorPmString(activeSchedule.startTime)} ~{" "}
                  {formatHourMinuteToAmorPmString(activeSchedule.endTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
