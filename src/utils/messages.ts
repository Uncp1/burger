import {
  closeModal,
  openModalNotification,
} from "../services/slices/modal-slice";
import { AppDispatch } from "../services/store";

interface Action {
  type: string;
  payload: {
    request: string;
    errorMessage: string;
  };
}

type State = Record<string, { errorMessage: string }>;

export const showMessageTimeout = (message: string, dispatch: AppDispatch) => {
  dispatch(openModalNotification(message));
  setTimeout(() => {
    dispatch(closeModal());
  }, 4200);
};

export const showMessage = (state: State, action: Action) => {
  state.message = action.payload;
};
export const setErrorMessage = (state: State, action: Action) => {
  const { request, errorMessage } = action.payload;
  state[request] = {
    ...state[request],
    errorMessage,
  };
};
