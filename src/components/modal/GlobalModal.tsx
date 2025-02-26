import { ScheduleAddModal } from "./ScheduleAddModal";

import { useAppSelector } from "../../hooks/use-redux";
import { ScheduleDetailModal } from "./ScheduleDetailModal";

const MODAL_TYPES = {
  ScheduleAddModal: "ScheduleAddModal",
  ScheduleDetailModal: "ScheduleDetailModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.ScheduleAddModal,
    component: <ScheduleAddModal />,
  },
  {
    type: MODAL_TYPES.ScheduleDetailModal,
    component: <ScheduleDetailModal />,
  },
];

export const GlobalModal = () => {
  const { modalType, isOpen } = useAppSelector((state) => state.modal);

  const findRenderModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const RenderModalComponent = () => {
    return findRenderModal?.component;
  };

  return <div role="dialog">{isOpen && <RenderModalComponent />}</div>;
};
