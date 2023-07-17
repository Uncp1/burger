import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { showMessageTimeout } from "../../utils/messages";
import { TUSer } from "../../utils/types";
import { updateCookie } from "../../utils/update-cookie";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
} from "../api/userApi";
import { AppDispatch, RootState } from "../store";

interface IFormPromise {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUSer;
}

interface IFormInput {
  email: string;
  password: string;
}

interface ILoginState {
  accessToken: string | null;
  refreshToken: string | null;
  isUserLoggedIn: boolean;
  user: {
    email: string | null;
    name: string | null;
    password: string | null;
  };
  errorMessage: string;
}

const initialState: ILoginState = {
  user: {
    email: null,
    name: null,
    password: null,
  },
  accessToken: null,
  refreshToken: null,
  isUserLoggedIn: !!getCookie("accessToken") || false,
  errorMessage: "",
};

export const fetchForgotPassword = createAsyncThunk(
  "fetchForgotPassword",
  async ({ email }, { dispatch }) => {
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
);
export const fetchResetPassword = createAsyncThunk(
  "fetchResetPassword",
  async (userData, { dispatch }) => {
    const { password, token } = userData;
    try {
      const res = await resetPassword({ password, token });
      showMessageTimeout("Пароль успешно востановлен", dispatch);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload.user;
      state.isUserLoggedIn = !!document.cookie;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.user = {
        email: null,
        name: null,
        password: null,
      };
      state.accessToken = null;
      state.refreshToken = null;
      state.isUserLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForgotPassword.pending, (state, action) => {
        state.isEmailSubmitted = action.payload;
        state.request = {
          ...initialState.request,
          fetch: true,
        };
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isPasswordChanged = action.payload;
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

export const { updateUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
