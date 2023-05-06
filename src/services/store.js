import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import ingredientSlice from "./slices/ingredient-slice";
import modalSlice from "./slices/modal-slice";
import orderSlice from "./slices/order-slice";

const rootReducer = combineReducers({
  ingredients: ingredientSlice,
  cart: cartSlice,
  modal: modalSlice,
  order: orderSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
