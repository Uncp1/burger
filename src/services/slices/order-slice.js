import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const createOrder = createAsyncThunk("createOrder", async (cart) => {
  try {
    const orderIds = [];
    cart.ingredients.map((item) => orderIds.push(item._id));
    orderIds.unshift(cart.bun._id);
    orderIds.push(cart.bun._id);
    return await api.createOrder({ ingredients: orderIds });
  } catch (err) {
    console.log(err);
    return err.message;
  }
});

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orderNumber: null,
    orderIds: [],
    orderFetchRequest: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderFetchRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number.toString();
        state.orderFetchRequest = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderFetchRequest = false;
        console.error(action.payload);
      });
  },
});

export default orderSlice.reducer;
