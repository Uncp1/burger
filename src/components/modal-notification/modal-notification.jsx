import PropTypes from "prop-types";
import styles from "./modal-notification.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/slices/modal-slice";

const ModalNotification = () => {
  const { isModalOpen, notificationData } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return createPortal(
    <div
      className={clsx(styles.notification, {
        [styles.notification_opened]: !!(isModalOpen && notificationData),
      })}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
    >
      <div className={styles.notification__header}>
        <h3
          className={clsx(
            styles.notification__title,
            "text",
            "text_type_main-default"
          )}
          id="modal-title"
        >
          {notificationData}
        </h3>
        <button
          className={styles.notification__close}
          aria-label="Закрыть модальное окно"
          type="button"
          onClick={() => handleModalClose()}
        >
          <CloseIcon type="primary" />
        </button>
      </div>
    </div>,
    document.body
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ModalNotification;
