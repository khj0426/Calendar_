import { ScheduleAddModal } from "./ScheduleAddModal";

import { useAppSelector } from "../../hooks/use-redux";

const MODAL_TYPES = {
  ScheduleAddModal: "ScheduleAddModal",
};

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.ScheduleAddModal,
    component: <ScheduleAddModal />,
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
