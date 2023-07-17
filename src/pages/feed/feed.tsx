import { FC, useEffect } from "react";
import Loader from "../../components/loader/loader";
import OrderList from "../../components/order-list/order-list";
import styles from "./feed.module.css";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/slices/webSocket-slice";
import { wssAll } from "../../utils/config";
import OrderData from "../../components/order-data/order-data";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

const FeedPage: FC = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.websocket);

  useEffect(() => {
    dispatch(wsConnectionStart(wssAll));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return orders && orders.length > 0 ? (
    <section className={styles.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styles.feed}>
        <OrderList />
        <OrderData />
      </div>
    </section>
  ) : (
    <Loader loadingText="Загрузка заказов" />
  );
};
export default FeedPage;
