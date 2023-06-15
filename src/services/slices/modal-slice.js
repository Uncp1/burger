import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredientData: null,
  orderData: null,
  notificationData: null,
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState: initialState,
  reducers: {
    openModalIngredient(state, action) {
      state.ingredientData = action.payload;
      state.isModalOpen = true;
    },
    openModalOrder(state, action) {
      state.orderData = true;
      state.isModalOpen = true;
    },
    openModalNotification(state, action) {
      state.notificationData = action.payload;
      console.log(state.notificationData);
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.ingredientData = null;
      state.orderData = null;
      state.notificationData = null;
      state.isModalOpen = null;
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
