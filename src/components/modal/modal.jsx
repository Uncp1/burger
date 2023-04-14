import PropTypes from 'prop-types';
import styles from './modal.module.css';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import IngredientInfo from '../ingredient-info/ingredient-info.jsx';
import OrderInfo from '../order-info/order-info.jsx';

const Modal = ({isModalOpened, close, title, ingredientInfo, orderInfo, orderNumber}) => {
  return createPortal(
    <>
      <ModalOverlay
        isModalOpened={isModalOpened}
        close={close}
      />

      <div
          className={clsx(styles.modal, { [styles.modal_opened]: isModalOpened })}
          onClick={(e) => e.stopPropagation()}
          >

        <div className={styles.modal__header}>
          <h3 className={clsx(styles.modal__title, 'text text_type_main-large')}>
            {title}
          </h3>
          
          <button
            className={styles.modal__close}
            type="button"
            onClick={() => close()}
            >
            <CloseIcon type="primary"/>
          </button>
        </div>

         {
          ingredientInfo &&
          <IngredientInfo data={ingredientInfo}/>
        }

        {
          orderInfo &&
          <OrderInfo 
          orderInfo = {orderInfo}
          orderNumber={orderNumber}
          />
        }

      </div>      
    </>,
    document.body
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  isModalOpened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default Modal;