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
};

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  /*
  async (email, password) => {
    try {
      return await loginUser(email, password);
    }*/ (email, password, dispatch) =>
    loginUser(email, password)
      .then((res) => {
        const { user, accessToken, refreshToken } = res;
        console.log(res);
        updateUser(user, accessToken, refreshToken);

        setCookie("accessToken", accessToken, 2000);
        setCookie("refreshToken", refreshToken, 2000);
        //setCookie("expiresAt", expiresAt, 2000);
        //updateUserData({ user, accessToken, refreshToken, dispatch });
      })
      .catch((err) => {
        console.log(err);
        return err.message;
      })
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
    extraReducers: (builder) => {
      builder
        //login
        .addCase(fetchLogin.pending, (state) => {
          console.log("buba1", state);
          //buba
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          console.log("buba22 ");
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
          console.log(localStorage);
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.accessToken = action.payload.accessToken;
          console.log("1", action.payload);
          updateUserData(
            action.payload.user,
            action.payload.accessToken,
            action.payload.refreshToken
          );
        })
        .addCase(fetchLogin.rejected, () => {})

        //register
        .addCase(fetchRegister.pending, (state, action) => {
          console.log(action);
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
        .addCase(fetchResetPassword.rejected, () => {});
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
