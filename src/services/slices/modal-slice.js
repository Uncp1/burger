import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationData: null,
  isModalOpen: false,
  modalIngredient: false,
  modalOrder: false,
  modalOrderDetails: null,
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
    openModalOrderFromHistory(state, action) {
      state.modalOrderDetails = action.payload;
      state.isModalOpen = true;
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
      state.modalOrderDetails = null;
    },
  },
});

const { actions } = modalSlice;
export const {
  openModalIngredient,
  openModalOrder,
  openModalNotification,
  closeModal,
  openModalOrderFromHistory,
} = actions;

export default modalSlice.reducer;
