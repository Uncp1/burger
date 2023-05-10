import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    counter: {},
    cart: {
      bun: null,
      ingredients: [],
    },
  },
  reducers: {
    addCartItem(state, action) {
      const ingredientId = action.payload._id;
      const ingrCounter = state.counter[ingredientId];
      const isIngredientInCart = Object.keys(state.counter).includes(
        ingredientId
      );

      state.cart.bun !== null &&
        action.payload.type === "bun" &&
        state.cart.bun !== action.payload &&
        (state.counter[state.cart.bun._id] = 0);

      isIngredientInCart
        ? (state.counter[action.payload._id] = ingrCounter + 1)
        : (state.counter[action.payload._id] = 1);

      action.payload.type === "bun"
        ? (state.cart.bun = action.payload)
        : state.cart.ingredients.push(action.payload);
    },
    removeCartItem(state, action) {
      const ingredientId = action.payload._id;
      const ingrCounter = state.counter[ingredientId];
      state.counter[action.payload._id] = ingrCounter - 1;

      state.cart.ingredients.splice(action.payload.index, 1);
    },
    sortCartItem(state, action) {
      const ingredientId = action.payload.ingredient._id;
      const ingrCounter = state.counter[ingredientId];
      const isIngredientInCart = Object.keys(state.counter).includes(
        ingredientId
      );

      isIngredientInCart
        ? (state.counter[action.payload.ingredient._id] = ingrCounter + 1)
        : (state.counter[action.payload.ingredient._id] = 1);

      state.cart.ingredients.splice(
        action.payload.atIndex,
        0,
        action.payload.ingredient
      );
    },
    emptyCart(state) {
      state.cart.bun = null;
      state.cart.ingredients = [];
      state.counter = {};
    },
  },
});

const { actions } = cartSlice;
export const { addCartItem, removeCartItem, emptyCart, sortCartItem } = actions;

export default cartSlice.reducer;
