import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { showMessageTimeout } from "../../utils/messages";
import { TUSer } from "../../utils/types";
import { updateCookie } from "../../utils/update-cookie";
import { loginUser, logoutUser } from "../api/userApi";
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

export const fetchLogin = createAsyncThunk<
  IFormPromise,
  IFormInput,
  { state: RootState; dispatch: AppDispatch }
>("fetchLogin", async (userData, { dispatch }) => {
  const { email, password } = userData;
  try {
    const res = await loginUser({ email, password });
    const { user, accessToken, refreshToken } = res;
    updateCookie({ user, accessToken, refreshToken });
    dispatch(
      updateUser({
        refreshToken: refreshToken,
        accessToken: accessToken,
        user: user,
      })
    );
    showMessageTimeout("Вход выполнен успешно", dispatch);
    return { user, accessToken, refreshToken, success: true };
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
});

export const fetchLogout = createAsyncThunk<
  IFormPromise,
  { state: RootState; dispatch: AppDispatch }
>("fetchLogout", async ({ dispatch }) => {
  try {
    const token = getCookie("refreshToken");
    const res = await logoutUser({ token });
    dispatch(logOut());
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
});

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
      .addCase(fetchLogin.pending, (state) => {
        state.errorMessage = "";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {})
      .addCase(fetchLogin.rejected, (state, action) => {})
      //logout
      .addCase(fetchLogout.pending, (state) => {})
      .addCase(fetchLogout.fulfilled, (state, action) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("expiresAt");
      })
      .addCase(fetchLogout.rejected, () => {});
  },
});

export const { updateUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
