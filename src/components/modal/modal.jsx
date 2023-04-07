import PropTypes from 'prop-types';
import styles from './modal.module.css';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
  return createPortal(
    <>
      <ModalOverlay
        isModalOpened={props.isModalOpened}
        close={props.close}
      />

      <div
          className={clsx(styles.modal, { [styles.modal_opened]: props.isModalOpened })}
          onClick={(e) => e.stopPropagation()}
          >

        <div className={styles.modal__header}>
          <h3 className={clsx(styles.modal__title, 'text text_type_main-large')}>
            {props.title}
          </h3>
          
          <button
            className={styles.modal__close}
            type="button"
            onClick={() => props.close}
            >
            <CloseIcon type="primary"/>
          </button>
        </div>
        {props.children}   
      </div>      
    </>
  )
}

export default Modal;