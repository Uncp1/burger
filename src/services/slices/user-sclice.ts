import { getCookie } from '../../utils/cookies';
import { getUser, patchUser } from '../api/userApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFormInput, TFormPromise } from '../../utils/types';
import { AppDispatch, RootState } from '../store';

interface IUserState {
  user: {
    email: string | null;
    name: string | null;
    password: string | null;
  };
  isUserLoggedIn: boolean;
  request: {
    fetch: boolean;
    error: boolean;
    message: boolean;
    success: boolean;
  };
}

const initialState: IUserState = {
  user: {
    email: null,
    name: null,
    password: null,
  },
  isUserLoggedIn: !!getCookie('accessToken') || false,
  request: {
    fetch: false,
    error: false,
    message: false,
    success: false,
  },
};

export const fetchGetUser = createAsyncThunk('profile/fetchGetUser', () =>
  getUser().catch((err) => console.log(err))
);

export const fetchUpdateUser = createAsyncThunk<
  TFormPromise,
  TFormInput,
  { state: RootState; dispatch: AppDispatch }
>('fetchUpdateUser', async ({ name, email, password }) => {
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw new Error('Email, name or password are not strings');
  }
  try {
    return await patchUser({ name, email, password });
  } catch (err) {
    console.log(err);
    return err;
  }
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.request.fetch = true;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.request.fetch = false;
        const user = action.payload.user || {
          email: null,
          name: null,
          password: null,
        };

        state.user = {
          email: user.email || null,
          name: user.name || null,
          password: user.password || null,
        };
      })
      .addCase(fetchUpdateUser.rejected, (state) => {});
  },
});

export default userSlice.reducer;
