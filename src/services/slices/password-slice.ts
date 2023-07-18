import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessageTimeout } from "../../utils/messages";
import { TFormInput, TFormPromise } from "../../utils/types";
import { forgotPassword, resetPassword } from "../api/userApi";
import { AppDispatch, RootState } from "../store";

interface IPasswordSlice {
  request: {
    fetch: boolean;
    error: boolean;
    message: boolean;
    success: boolean;
  };
  isEmailSubmitted: boolean;
  isPasswordChanged: boolean;
}

const initialState: IPasswordSlice = {
  request: {
    fetch: false,
    error: false,
    message: false,
    success: false,
  },
  isEmailSubmitted: false,
  isPasswordChanged: false,
};

export const fetchForgotPassword = createAsyncThunk<
  TFormPromise,
  TFormInput,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("fetchForgotPassword", async ({ email }, { dispatch }) => {
  try {
    const res = await forgotPassword({ email });
    showMessageTimeout(
      "На указанную почту успешно отправлено письмо с кодом для сброса пароля",
      dispatch
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const fetchResetPassword = createAsyncThunk<
  TFormPromise,
  TFormInput,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("fetchResetPassword", async (userData, { dispatch }) => {
  const { password, token } = userData;
  try {
    const res = await resetPassword({ password, token });
    showMessageTimeout("Пароль успешно востановлен", dispatch);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
});

const passwordSlice = createSlice({
  name: "passwordSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, (state, action) => {
        state.isEmailSubmitted = !action.payload;
        state.request = {
          ...initialState.request,
          fetch: true,
        };
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isPasswordChanged = !action.payload;
        state.request = {
          ...state.request,
          fetch: false,
          message: true,
          success: true,
        };
      })
      .addCase(fetchForgotPassword.rejected, () => {})
      //reset
      .addCase(fetchResetPassword.pending, (state) => {})
      .addCase(fetchResetPassword.fulfilled, (state, action) => {})
      .addCase(fetchResetPassword.rejected, () => {});
  },
});

export default passwordSlice.reducer;
