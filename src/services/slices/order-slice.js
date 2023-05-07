import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const createOrder = createAsyncThunk("createOrder", async (orderIds) => {
  try {
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
  reducers: {
    createOrder(state, action) {
      const ids = action.payload.ingredients.map((item) => ids.push(item._id));
      ids.unshift(action.payload.bun._id);
      ids.push(action.payload.bun._id);
      state.orderIds = ids;
    },
    resetOrder(state) {
      state.orderIds = [];
    },
  },
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
