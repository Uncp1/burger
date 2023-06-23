import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/loader";
import OrderList from "../../../components/order-list/order-list";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../../services/slices/webSocket-slice";
import { wssProfile } from "../../../utils/config";
import { getCookie } from "../../../utils/cookies";

const ProfileOrders = () => {
  const { orders } = useSelector((store) => store.websocket);
  const dispatch = useDispatch();
  const tokenWithoutBearer = getCookie("accessToken").replace("Bearer ", "");

  useEffect(() => {
    dispatch(wsConnectionStart(`${wssProfile}?token=${tokenWithoutBearer}`));
    return () => dispatch(wsConnectionClosed());
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
