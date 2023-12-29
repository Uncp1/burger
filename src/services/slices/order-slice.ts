import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TCart, TOrderPromise, TOrderType } from '../../utils/types';
import { getOrder, postOrder } from '../api/api';

export type OrderState = {
  order: TOrderType | null;
  orderNumber: string | null;
  orderIds: string[] | null;
  orderFetchRequest: boolean;
};

export const createOrder = createAsyncThunk<TOrderPromise, TCart>(
  'order/createOrder',
  async (cart, { rejectWithValue }) => {
    try {
      if (!cart.ingredients || !cart.bun) {
        throw new Error('Некорректное содержимое корзины');
      }

      const ingredientsIds: string[] = cart.ingredients.map((item) => item._id);
      const orderIds: string[] = [
        cart.bun._id,
        ...ingredientsIds,
        cart.bun._id,
      ];

      const res = await postOrder({ order: orderIds });
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('Неизвестная ошибка');
      }
    }
  }
);

export const fetchGetOrder = createAsyncThunk<TOrderPromise, number>(
  'order/getOrder',
  (orderNumber, { dispatch, rejectWithValue }) => {
    return getOrder({ orderNumber })
      .then((res) => {
        const { orders } = res;
        dispatch(setOrder(orders[0]));
        return res;
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          return rejectWithValue(err.message);
        } else {
          return rejectWithValue('Неизвестная ошибка');
        }
      });
  }
);

const initialState: OrderState = {
  orderNumber: null,
  orderIds: [],
  orderFetchRequest: false,
  order: null,
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
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
