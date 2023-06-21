import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware/socketMiddleware";
import cartSlice from "./slices/cart-slice";
import ingredientSlice from "./slices/ingredient-slice";
import modalSlice from "./slices/modal-slice";
import orderSlice from "./slices/order-slice";
import userSlice from "./slices/user-slice";
import webSocketSlice, { wsActions } from "./slices/webSocket-slice";

const rootReducer = combineReducers({
  ingredients: ingredientSlice,
  cart: cartSlice,
  modal: modalSlice,
  order: orderSlice,
  user: userSlice,
  websocket: webSocketSlice,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});
