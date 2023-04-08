import styles from './order-info.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const OrderInfo = ({ orderNumber }) => {
  return (
    <div className={`${styles.order} mt-4`}>
      <span className="text text_type_digits-large">
        {orderNumber}
      </span>

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

      
      <CheckMarkIcon type="primary"  extraClass={styles.order__mark}/>
      
     
      <span className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </span>

      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  )
} 

OrderInfo.propTypes = {
  orderNumber: PropTypes.string.isRequired
};

export default OrderInfo;