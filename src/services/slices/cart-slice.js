import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    ingredientsCounter: {},
    cart: {
      bun: null,
      ingredients: [],
    },
  },
  reducers: {
    addCartItem(state, action) {
      if (action.payload.type === "bun") {
        state.cart.bun = action.payload;
      } else {
        state.cart.ingredients.push(action.payload);
      }
    },
    removeCartItem(state, action) {
      state.cart.ingredients.splice(action.payload.index, 1);
    },
    sortCartItem(state, action) {
      state.cart.ingredients.splice(
        action.payload.atIndex,
        0,
        action.payload.ingredient
      );
    },
    emptyCart(state) {
      state.cart.bun = null;
      state.cart.ingredients = [];
    },
  },
});

const { actions } = cartSlice;
export const { addCartItem, removeCartItem, emptyCart, sortCartItem } = actions;

export default cartSlice.reducer;
