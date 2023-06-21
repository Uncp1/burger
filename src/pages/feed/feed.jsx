import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/loader";
import OrderList from "../../components/order-list/order-list";
import styles from "./feed.module.css";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../services/slices/webSocket-slice";
import { wssAll } from "../../utils/config";

const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.websocket);

  useEffect(() => {
    dispatch(wsConnectionStart(wssAll));
    return () => dispatch(wsConnectionClosed());
  }, [dispatch]);

  return orders ? (
    <div className={styles.container}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <section className={styles.feed}>
        <OrderList />
      </section>
    </div>
  ) : (
    <Loader loadingText="Загрузка заказов" />
  );
};
export default FeedPage;
