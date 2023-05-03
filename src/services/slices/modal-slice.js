import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    isModalOpen: false,
    modalData: null,
    isOrderConfirmation: false,
    isIngrefientInfo: false,
  },
  reducers: {
    openModal(state, action) {
      state.modalData = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.modalData = null;
      state.isModalOpen = false;
    },
  },
});

const { actions } = modalSlice;
export const { openModal, closeModal } = actions;

export default modalSlice.reducer;
