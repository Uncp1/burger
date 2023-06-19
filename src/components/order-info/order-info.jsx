import styles from "./order-info.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

const OrderInfo = () => {
  const { orderNumber } = useSelector((state) => state.order);
  return (
    <div className={`${styles.order} mt-4`}>
      <span className="text text_type_digits-large">{orderNumber}</span>

      <span
        className={`
          ${styles.order__text}
          'text'
          'text_type_main-medium'
          'mt-8'
          'mb-15'
        `}
      >
        Идентификатор заказа
      </span>

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
