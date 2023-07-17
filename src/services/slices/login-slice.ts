import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { showMessageTimeout } from "../../utils/messages";
import { TUSer } from "../../utils/types";
import { updateCookie } from "../../utils/update-cookie";
import { loginUser, logoutUser } from "../api/userApi";
import { AppDispatch, RootState } from "../store";
import { updateUser } from "./user-slice";

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
>("fetchLogin", (userData, { dispatch }) => {
  const { email, password } = userData;
  loginUser({ email, password })
    .then((res) => {
      const { user, accessToken, refreshToken } = res;
      updateCookie({ user, accessToken, refreshToken });
      dispatch(
        updateUser({
          refreshToken: refreshToken,
          accessToken: accessToken,
          user: user,
        })
      );
    })
    .then(() => {
      showMessageTimeout("Вход выполнен успешно", dispatch);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const fetchLogout = createAsyncThunk("fetchLogout", async () => {
  try {
    const token = getCookie("refreshToken");
    return await logoutUser({ token });
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
