import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrderType } from "../../utils/types";

interface ISliceState {
  wsConnected: boolean;
  orders: TOrderType[] | null;
  total: number;
  totalToday: number;
}

const initialState: ISliceState = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
};

const webSocketSlice = createSlice({
  name: "webSocketSlice",
  initialState: initialState,
  reducers: {
    wsConnectionStart() {
      return undefined;
    },
    wsConnectionSuccess(state) {
      state.wsConnected = true;
    },
    wsConnectionFailed(state) {
      state.wsConnected = false;
    },
    wsConnectionClosed(state) {
      state.wsConnected = false;
    },
    wsGetAllOrders(state, action) {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders;
      state.total = total;
      state.totalToday = totalToday;
    },
  },
});

export const {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionFailed,
  wsGetAllOrders,
} = webSocketSlice.actions;

export const wsActions = {
  wsInit: wsConnectionStart.type,
  onOpen: wsConnectionSuccess.type,
  onClose: wsConnectionClosed.type,
  onError: wsConnectionFailed.type,
  onMessage: wsGetAllOrders.type,
};
export default webSocketSlice.reducer;
