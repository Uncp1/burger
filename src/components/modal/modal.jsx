import PropTypes from "prop-types";
import styles from "./modal.module.css";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

import IngredientInfo from "../ingredient-info/ingredient-info.jsx";
import OrderInfo from "../order-info/order-info.jsx";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/slices/modal-slice";

const Modal = ({ title }) => {
  const { isModalOpen, isIngrefientInfo, isOrderConfirmation, modalData } =
    useSelector((state) => state.modal);

  const dispatch = useDispatch();
  return createPortal(
    <>
      <ModalOverlay />

      <div
        className={clsx(styles.modal, { [styles.modal_opened]: isModalOpen })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__header}>
          <h3
            className={clsx(styles.modal__title, "text text_type_main-large")}
          >
            {title}
          </h3>

          <button
            className={styles.modal__close}
            type="button"
            onClick={() => dispatch(closeModal())}
          >
            <CloseIcon type="primary" />
          </button>
        </div>

        {isIngrefientInfo && <IngredientInfo ingredient={modalData} />}

        {isOrderConfirmation && <OrderInfo />}
      </div>
    </>,
    document.body
  );
};

Modal.propTypes = {
  title: PropTypes.string,
};

export default Modal;
