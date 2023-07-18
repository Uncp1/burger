import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socketMiddleware";
import cartSlice from "./slices/cart-slice";
import ingredientSlice from "./slices/ingredient-slice";
import loginSlice from "./slices/login-slice";
import modalSlice from "./slices/modal-slice";
import orderSlice from "./slices/order-slice";
import passwordSlice from "./slices/password-slice";
import userSclice from "./slices/user-sclice";
import webSocketSlice, { wsActions } from "./slices/webSocket-slice";

const rootReducer = combineReducers({
  ingredients: ingredientSlice,
  cart: cartSlice,
  modal: modalSlice,
  order: orderSlice,
  user: userSclice,
  login: loginSlice,
  password: passwordSlice,
  websocket: webSocketSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
