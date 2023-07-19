import { Middleware, MiddlewareAPI } from "redux";
import { TOrderType, TWebsocketActions } from "../../utils/types";
import { fetchGetUser } from "../slices/user-sclice";
import { AppDispatch, RootState } from "../store";

interface IWebsocketState {
  wsConnected: boolean;
  orders: TOrderType[] | null;
  total: number;
  totalToday: number;
}
export const socketMiddleware =
  (wsActions: TWebsocketActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (type === onClose && socket?.readyState === 1) {
        socket.close();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: IWebsocketState & { message: string } =
            JSON.parse(data);
          if (
            parsedData.message &&
            parsedData.message === "Invalid or missing token"
          ) {
            dispatch(fetchGetUser());
          }
          const { ...restParsedData } = parsedData;

          if (restParsedData.orders) {
            restParsedData.orders.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            dispatch({ type: onMessage, payload: restParsedData });
          }
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };
      }
      next(action);
    };
  };
