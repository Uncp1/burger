import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name:'cartSlice',
  initialState: {
    orderNumber: null,
    cartPrice: 0,
    cart: []
  },
  reducers: {
    addCartItem(state, action) {
      if (action.payload.type === 'bun') {
        state.cart.bun = action.payload.value;
      } else {
        state.cart.push(action.payload.value);
      }  
    },
    removeCartItem(state, action) {
      if (action.payload.type === 'bun') {
        state.cart.bun = null;
      } else {
        state.cart.filter((item) => {
          return item !== action.payload.value
        })
      }  
    }
  }
});

const { actions } = cartSlice;
export const { addCartItem, removeCartItem } = actions;

export default cartSlice.reducer;