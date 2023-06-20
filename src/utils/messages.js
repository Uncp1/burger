import {
  closeModal,
  openModalNotification,
} from "../services/slices/modal-slice";

export const showMessageTimeout = (message, dispatch) => {
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
