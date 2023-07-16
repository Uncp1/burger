import { deleteCookie, getCookie } from "../../utils/cookies";
import { updateCookie } from "../../utils/update-cookie";
import {
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  patchUser,
  registerUser,
  resetPassword,
} from "../api/userApi";
import { setCookie } from "../../utils/cookies";
import { showMessageTimeout } from "../../utils/messages";
import { TUSer } from "../../utils/types";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

interface IUserState {
  user: {
    email: string | null;
    name: string | null;
    password: string | null;
  };
  token: {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: string | null;
  };
  isUserLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string;
  message: string;
  errorMessage: string;
  request: {
    fetch: boolean;
    error: boolean;
    message: boolean;
    success: boolean;
  };
  isEmailSubmitted: boolean;
  isPasswordChanged: boolean;
}

const initialState: IUserState = {
  user: {
    email: null,
    name: null,
    password: null,
  },
  token: {
    accessToken: getCookie("accessToken") || null,
    refreshToken: getCookie("refreshToken") || null,
    expiresAt: getCookie("expiresAt") || null,
  },
  isUserLoggedIn: !!getCookie("accessToken") || false,
  accessToken: null,
  refreshToken: null,
  error: "",
  message: "",
  errorMessage: "",
  request: {
    fetch: false,
    error: false,
    message: false,
    success: false,
  },
  isEmailSubmitted: false,
  isPasswordChanged: false,
};

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  ({ email, password }, { dispatch }) => {
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
        return err.message;
      });
  }
);
export const fetchLogout = createAsyncThunk("fetchLogout", async () => {
  try {
    const token = getCookie("refreshToken");
    return await logoutUser({ token });
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
export const fetchRegister = createAsyncThunk(
  "fetchRegister",
  ({ name, email, password }, { dispatch }): TUSer => {
    registerUser({ name, email, password })
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
        showMessageTimeout(
          "Пользователь успешно создан. Добро пожаловать",
          dispatch
        );
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
  }
);
export const fetchForgotPassword = createAsyncThunk(
  "fetchForgotPassword",
  ({ email }, { dispatch }) => {
    forgotPassword({ email })
      .then(() => {
        showMessageTimeout(
          "На указанную почту успешно отправлено письмо с кодом для сброса пароля",
          dispatch
        );
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
  }
);
export const fetchResetPassword = createAsyncThunk(
  "fetchResetPassword",
  async ({ password, token }, { dispatch }) => {
    resetPassword({ password, token })
      .then(() => {
        showMessageTimeout("Пароль успешно востановлен", dispatch);
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      });
  }
);

export const fetchGetUser = createAsyncThunk("profile/fetchGetUser", () =>
  getUser().catch((err) => console.log(err))
);

export const fetchUpdateUser = createAsyncThunk(
  "fetchUpdateUser",
  async ({ name, email, password }) => {
    try {
      return await patchUser({ name, email, password });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload.user;
      state.isUserLoggedIn = !!document.cookie;
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.message = "";
        state.errorMessage = "";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {})
      .addCase(fetchLogin.rejected, (state, action) => {
        console.log(action);
        state.errorMessage = action.payload.message;
      })
      //register
      .addCase(fetchRegister.pending, (state, action) => {})
      .addCase(fetchRegister.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;

        state.user = user;
        state.user.password = action.meta.arg.password;
        state.isUserLoggedIn = true;

        setCookie("accessToken", accessToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken, { expires: 1200 });
      })
      .addCase(fetchRegister.rejected, (action) => {})

      //logout
      .addCase(fetchLogout.pending, (state) => {})
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.user = {};
        state.isUserLoggedIn = false;
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("expiresAt");
      })
      .addCase(fetchLogout.rejected, () => {})
      //forgot
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
      .addCase(fetchResetPassword.rejected, () => {})

      // Get user
      .addCase(fetchGetUser.pending, (state) => {})
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        if (!!action.payload) {
          const { user } = action.payload;
          const { email, name } = user;

          state.user = {
            ...state.user,
            email,
            name,
          };
          state.isUserLoggedIn = true;
        }
      })
      //updateUser
      .addCase(fetchUpdateUser.pending, (state) => {
        state.request = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
        state.request = false;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.request = false;
      });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
