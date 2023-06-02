const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    token: null,
  },
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
  },
});

export default userSlice.reducer;
