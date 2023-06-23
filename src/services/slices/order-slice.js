import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder, postOrder } from "../api/api";

export const createOrder = createAsyncThunk("createOrder", async (cart) => {
  try {
    const orderIds = [];
    cart.ingredients.map((item) => orderIds.push(item._id));
    orderIds.unshift(cart.bun._id);
    orderIds.push(cart.bun._id);
    return await postOrder({ ingredients: orderIds });
  } catch (err) {
    console.log(err);
    return err.message;
  }
});

export const fetchGetOrder = createAsyncThunk(
  "order/getOrder",
  (orderNumber, { dispatch, rejectWithValue }) => {
    return getOrder({ orderNumber })
      .then((res) => {
        const { orders } = res;
        dispatch(setOrder(orders[0]));
        return res;
      })
      .catch((e) => rejectWithValue(e));
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orderNumber: null,
    orderIds: [],
    orderFetchRequest: false,
    order: null,
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
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

const { actions } = orderSlice;
export const { setOrder } = actions;

export default orderSlice.reducer;
