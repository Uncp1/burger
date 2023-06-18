import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationData: null,
  isModalOpen: false,
  modalIngredient: false,
  modalOrder: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialState,
  reducers: {
    openModalIngredient(state, action) {
      state.isModalOpen = true;
      state.modalIngredient = action.payload;
    },
    openModalOrder(state, action) {
      state.isModalOpen = true;
      state.modalOrder = true;
    },
    openModalNotification(state, action) {
      state.notificationData = action.payload;
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.notificationData = null;
      state.isModalOpen = null;
      state.modalIngredient = false;
      state.modalOrder = false;
    },
  },
});

const { actions } = modalSlice;
export const {
  openModalIngredient,
  openModalOrder,
  openModalNotification,
  closeModal,
} = actions;

export default modalSlice.reducer;
