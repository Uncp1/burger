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
      action.payload.type === "order"
        ? (state.isOrderConfirmation = true)
        : (state.isIngrefientInfo = true);
      state.modalData = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.isIngrefientInfo = false;
      state.modalData = null;
    },
  },
});

const { actions } = modalSlice;
export const { openModal, closeModal } = actions;

export default modalSlice.reducer;
