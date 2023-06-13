import { getCookie } from "../../utils/cookies";
import { updateUserData } from "../../utils/updateUserData";
import { loginUser, registerUser } from "../api/userApi";
import { setCookie } from "../../utils/cookies";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: {
    email: null,
    name: null,
    password: null,
  }, // remove later
  isUserLoggedIn: getCookie("accessToken"),
  accessToken: null,
  refreshToken: null,
};

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  async (email, password) => {
    try {
      return await loginUser(email, password);
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);
export const fetchLogout = createAsyncThunk("fetchLogout", async () => {
  try {
    //return await loginUser(email, password);
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
  async () => {
    try {
      //return await loginUser(email, password);
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
);
export const fetchResetPassword = createAsyncThunk(
  "fetchResetPassword",
  async () => {
    try {
      //return await loginUser(email, password);
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
    updateUser: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.profileFetchRequest = true;
        state.profileFetchFailed = false;
        state.message = "";
        state.errorMessage = "";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.user = user;
        console.log(state);
        state.user.password = action.meta.arg.password;
        state.isUserLoggedIn = true;
        setCookie("accessToken", accessToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken, { expires: 1200 });
        state.profileFetchRequest = false;
        //state.message = NOTIFICATION_LOGIN_SUCCESS;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.profileFetchRequest = false;
        state.profileFetchFailed = true;
        state.errorMessage = action.payload.message;
        // (action.payload.message === SERVER_RESPOND_INCORRECT_VALUES)
        // ? state.errorMessage = ERROR_LOGIN
        // : state.errorMessage = action.payload.message;
      });
    /*
      builder
        //login
        .addCase(fetchLogin.pending, (state) => {
          console.log("buba1", state);
          //buba
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          console.log(localStorage);
          state.user = action.payload.user;
          state.refreshToken = action.payload.refreshToken;
          state.accessToken = action.payload.accessToken;
          console.log("1", action.payload);
        })
        .addCase(fetchLogin.rejected, () => {})

        //register
        .addCase(fetchRegister.pending, (state, action) => {
          console.log(action, "bubaaaaa");
          //buba
        })
        .addCase(fetchRegister.fulfilled, (state, action) => {
          console.log(action);
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.password = action.meta.arg.password;
          state.accessToken = action.payload.accessToken;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        })
        .addCase(fetchRegister.rejected, (action) => {
          console.log(action);
        })
        //logoutaction
        .addCase(fetchLogout.pending, (state) => {})
        .addCase(fetchLogout.fulfilled, (state, action) => {})
        .addCase(fetchLogout.rejected, () => {})
        //forgot
        .addCase(fetchForgotPassword.pending, (state) => {})
        .addCase(fetchForgotPassword.fulfilled, (state, action) => {})
        .addCase(fetchForgotPassword.rejected, () => {})
        //reset
        .addCase(fetchResetPassword.pending, (state) => {})
        .addCase(fetchResetPassword.fulfilled, (state, action) => {})
        .addCase(fetchResetPassword.rejected, () => {});  */
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
