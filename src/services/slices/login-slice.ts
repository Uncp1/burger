import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { showMessageTimeout } from "../../utils/messages";
import { TFormInput, TFormPromise } from "../../utils/types";
import { updateCookie } from "../../utils/update-cookie";
import { loginUser, logoutUser, registerUser } from "../api/userApi";
import { AppDispatch, RootState } from "../store";
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

export const fetchLogin = createAsyncThunk<
  TFormPromise,
  TFormInput,
  { state: RootState; dispatch: AppDispatch }
>("fetchLogin", async (userData, { dispatch }) => {
  const { email, password } = userData;
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Email or password are not strings");
  }
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
  TFormPromise,
  { dispatch: AppDispatch }
>("fetchLogout", async ({ dispatch }) => {
  const token = getCookie("refreshToken");
  if (typeof token !== "string") {
    throw new Error("unexpected cookie error");
  }
  try {
    const res = await logoutUser({ token });
    dispatch(logOut());
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
});

export const fetchRegister = createAsyncThunk<
  TFormPromise,
  TFormInput,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>("fetchRegister", async (userData, { dispatch }) => {
  const { name, email, password } = userData;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("Email, name or password are not strings");
  }
  try {
    const res = await registerUser({ name, email, password });
    const { user, accessToken, refreshToken } = res;
    updateCookie({ user, accessToken, refreshToken });
    dispatch(
      updateUser({
        refreshToken: refreshToken,
        accessToken: accessToken,
        user: user,
      })
    );
    showMessageTimeout(
      "Пользователь успешно создан. Добро пожаловать",
      dispatch
    );
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
});

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
      .addCase(fetchLogin.pending, (state) => {})
      .addCase(fetchLogin.fulfilled, (state, action) => {})
      .addCase(fetchLogin.rejected, (state, action) => {})
      //logout
      .addCase(fetchLogout.pending, (state) => {})
      .addCase(fetchLogout.fulfilled, (state, action) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("expiresAt");
      })
      .addCase(fetchLogout.rejected, () => {})
      //register
      .addCase(fetchRegister.pending, (state, action) => {})
      .addCase(fetchRegister.fulfilled, (state, action) => {})
      .addCase(fetchRegister.rejected, (action) => {});
  },
});

export const { updateUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
