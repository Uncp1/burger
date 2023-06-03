import { loginUser } from "../api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: null, // remove later
  accessToken: null,
  email: null,
  name: null,
  password: null,
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
export const fetchRegister = createAsyncThunk("fetchRegister", async () => {
  try {
    //return await loginUser(email, password);
  } catch (err) {
    console.log(err);
    return err.message;
  }
});
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
    setUser: (state, action) => {
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
        .addCase(fetchLogin.pending, (state) => {
          //buba
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
          state.name = action.payload.user.name;
          state.email = action.payload.user.email;
          state.password = action.meta.arg.password;
          state.accessToken = action.payload.accessToken;
        });
    },
  },
});

export default userSlice.reducer;
