import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/loader";
import OrderDetails from "../../components/order-details/order-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { fetchGetOrder } from "../../services/slices/order-slice";
import NotFound404 from "../not-found/not-found";
import styles from "./order.module.css";

const OrderPage: FC = () => {
  const { order } = useAppSelector((store) => store.order);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchGetOrder(params.id));
  }, [dispatch, params.id]);

  return order === null ? (
    <Loader loadingText="Загрузка заказа..." />
  ) : order ? (
    <section className={styles.section}>
      <OrderDetails order={order} />
    </section>
  ) : (
    <NotFound404 />
  );
};

export default OrderPage;
