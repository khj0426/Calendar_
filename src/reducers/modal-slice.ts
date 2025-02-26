import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalStateProps {
  isOpen: boolean;
  modalType: string;
}

const modalSlice = createSlice({
  name: "modal-slice",
  initialState: {
    isOpen: false,
    modalType: "",
  } as ModalStateProps,
  reducers: {
    openModal: (
      state,
      actions: PayloadAction<{
        modalType: string;
      }>
    ) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = true;
    },
    closeModal: (
      state,
      actions: PayloadAction<{
        modalType: string;
      }>
    ) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = false;
    },
    toggleModal: (
      state,
      actions: PayloadAction<{
        modalType: string;
      }>
    ) => {
      const { modalType } = actions.payload;
      state.modalType = modalType;
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
