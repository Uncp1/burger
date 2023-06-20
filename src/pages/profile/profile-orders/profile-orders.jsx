import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/loader/loader";
import OrderList from "../../../components/order-list/order-list";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../../services/slices/webSocket-slice";

const ProfileOrders = () => {
  const { orders } = useSelector((store) => store.websocket);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
  }, [dispatch]);

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
