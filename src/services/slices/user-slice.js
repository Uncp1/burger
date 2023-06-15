import { getCookie } from "../../utils/cookies";
import { updateCookie } from "../../utils/updateUserData";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  patchUser,
  registerUser,
  resetPassword,
} from "../api/userApi";
import { setCookie } from "../../utils/cookies";
import { useLogout } from "../hooks/useLogout";
import {
  showMessageTimeout,
  useShowMessageTimeout,
} from "../../utils/messages";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: {
    email: null,
    name: null,
    password: null,
  },
  isUserLoggedIn: !!getCookie("accessToken") || false,
  accessToken: null,
  refreshToken: null,
  error: "",
  message: "",
  errorMessage: "",
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
  async ({ name, email, password }) => {
    try {
      return await registerUser({ name, email, password });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);
export const fetchForgotPassword = createAsyncThunk(
  "fetchForgotPassword",
  async ({ email }) => {
    try {
      return await forgotPassword({ email });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);
export const fetchResetPassword = createAsyncThunk(
  "fetchResetPassword",
  async ({ password, token }) => {
    try {
      return await resetPassword({ password, token });
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "fetchUpdateUser",
  async (data) => {
    try {
      return await patchUser(data);
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
      state.user = {
        ...state.user,
        ...action.payload,
      };
      state.isUserLoggedIn = !!getCookie("accessToken");
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
        //state.profileFetchRequest = true;
        //state.profileFetchFailed = false;
        state.message = "";
        state.errorMessage = "";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {})
      .addCase(fetchLogin.rejected, (state, action) => {
        //state.profileFetchRequest = false;
        //state.profileFetchFailed = true;
        state.errorMessage = action.payload.message;
        // (action.payload.message === SERVER_RESPOND_INCORRECT_VALUES)
        // ? state.errorMessage = ERROR_LOGIN
        // : state.errorMessage = action.payload.message;
      })
      //register
      .addCase(fetchRegister.pending, (state, action) => {
        console.log(action, "bubaaaaa");
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;

        state.user = user;
        state.user.password = action.meta.arg.password;
        state.isUserLoggedIn = !!getCookie("accessToken");

        setCookie("accessToken", accessToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken, { expires: 1200 });
      })
      .addCase(fetchRegister.rejected, (action) => {
        console.log(action);
      })

      //logout
      .addCase(fetchLogout.pending, (state) => {})
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.user = {};
        state.isUserLoggedIn = false;
        setCookie("accessToken", "", { expires: 1 });
        setCookie("refreshToken", "", { expires: 1 });
      })
      .addCase(fetchLogout.rejected, () => {})
      //forgot
      .addCase(fetchForgotPassword.pending, (state) => {})
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {})
      .addCase(fetchForgotPassword.rejected, () => {})
      //reset
      .addCase(fetchResetPassword.pending, (state) => {})
      .addCase(fetchResetPassword.fulfilled, (state, action) => {})
      .addCase(fetchResetPassword.rejected, () => {})
      //updateUser
      .addCase(fetchUpdateUser.pending, (state) => {})
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.user = user;
      })
      .addCase(fetchUpdateUser.rejected, () => {});
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
