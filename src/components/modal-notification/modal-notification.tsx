import styles from "./modal-notification.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { FC } from "react";
import { closeModal } from "../../services/slices/modal-slice";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";

const ModalNotification: FC = () => {
  const { isModalOpen, notificationData } = useAppSelector(
    (store) => store.modal
  );

  const dispatch = useAppDispatch();

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

export default ModalNotification;
