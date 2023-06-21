import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/loader";
import OrderList from "../../../components/order-list/order-list";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../../services/slices/webSocket-slice";
import { wssProfile } from "../../../utils/config";

const ProfileOrders = () => {
  const { orders } = useSelector((store) => store.websocket);
  const { accessToken } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const tokenWithoutBearer = accessToken?.replace("Bearer ", "");

  useEffect(() => {
    dispatch(wsConnectionStart(`${wssProfile}?token=${tokenWithoutBearer}`));
  }, [dispatch, tokenWithoutBearer]);

  return (
    <>
      {orders ? (
        <OrderList />
      ) : (
        <Loader loadingText="Загрузка истории заказов" />
      )}
    </>
  );
};

export default ProfileOrders;
