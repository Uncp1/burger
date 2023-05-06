import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const createOrder = createAsyncThunk("createOrder", async (cart) => {
  try {
    const bunId = cart.bun._id;
    const ingredientsIdsArray = cart.ingredients.map((item) => item._id);
    const orderIds = [bunId, ...ingredientsIdsArray, bunId];
    console.log(orderIds);
    return await api.createOrder(orderIds);
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
