import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";
import { showMessageTimeout } from "../../utils/messages";
import { TUSer } from "../../utils/types";
import { updateCookie } from "../../utils/update-cookie";
import { loginUser, logoutUser, registerUser } from "../api/userApi";
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

export const fetchRegister = createAsyncThunk(
  "fetchRegister",
  async (userData, { dispatch }) => {
    const { name, email, password } = userData;
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
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

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
      .addCase(fetchRegister.pending, (state, action) => {})
      .addCase(fetchRegister.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;

        state.user = user;
        state.user.password = action.meta.arg.password;
        state.isUserLoggedIn = true;

        setCookie("accessToken", accessToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken, { expires: 1200 });
      })
      .addCase(fetchRegister.rejected, (action) => {});
  },
});

export const { updateUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
