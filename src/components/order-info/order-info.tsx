import styles from "./order-info.module.css";
import { useAppSelector } from "../../services/hooks/hooks";

const OrderInfo = () => {
  const { orderNumber } = useAppSelector((state) => state.order);
  return (
    <div className={`${styles.order} mt-4`}>
      <span className={`text text_type_digits-large ${styles.order__number}`}>
        {orderNumber}
      </span>

      <h3
        className={`
          ${styles.order__text}
          'text'
          'text_type_main-medium'
          'mt-8'
          'mb-15'
        `}
      >
        Идентификатор заказа
      </h3>

      <div className={styles.icon}>
        <div className={styles.icon__mark}></div>
        <div className={`${styles.icon__layer} ${styles.layer_size_s}`}></div>
        <div className={`${styles.icon__layer} ${styles.layer_size_m}`}></div>
        <div className={`${styles.icon__layer} ${styles.layer_size_l}`}></div>
      </div>

      <span className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </span>

      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};

export default OrderInfo;
