import { fetchGetUser } from "../slices/user-slice";

export const socketMiddleware = (wsActions) => (store) => {
  let socket = null;

  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
    if (type === wsInit) {
      socket = new WebSocket(payload);
    }

    if (type === wsInit && socket?.readyState === 1) {
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
        const parsedData = JSON.parse(data);
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
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
