import {
  closeModal,
  openModalNotification,
} from "../services/slices/modal-slice";
import { AppDispatch } from "../services/store";

export const showMessageTimeout = (message: string, dispatch: AppDispatch) => {
  dispatch(openModalNotification(message));
  setTimeout(() => {
    dispatch(closeModal());
  }, 4200);
};

export const showMessage = (state, action) => {
  const { boolean } = action.payload;
  state.message = boolean;
};
export const setErrorMessage = (state, action) => {
  const { request, errorMessage } = action.payload;
  state[request] = {
    ...state[request],
    errorMessage,
  };
};
