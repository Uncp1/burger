import { createSlice } from "@reduxjs/toolkit";
import { TIngredientType, TOrderType } from "../../utils/types";

export type ModalState = {
  modalIngredient: TIngredientType | null;
  modalOrder: boolean;
  notificationData: string | null;
  isModalOpen: boolean;
  modalOrderDetails: TOrderType | null;
};

const initialState: ModalState = {
  notificationData: null,
  isModalOpen: false,
  modalIngredient: null,
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
    openModalOrder(state) {
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
      state.isModalOpen = false;
      state.modalIngredient = null;
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
