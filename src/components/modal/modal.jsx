import PropTypes from "prop-types";
import styles from "./modal.module.css";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

const Modal = ({ title, children, handleModalClose }) => {
  const { modalIngredient, modalOrderDetails, notificationData, isModalOpen } =
    useSelector((state) => state.modal);

  const handleEscape = useCallback(
    (e) => {
      e.preventDefault();
      e.key === "Escape" && handleModalClose();
    },
    [handleModalClose]
  );

  useEffect(() => {
    if (!isModalOpen) return;
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape, isModalOpen]);

  return createPortal(
    <>
      {!!notificationData ? (
        <></>
      ) : (
        <>
          <ModalOverlay handleModalClose={handleModalClose} />

          <div
            className={clsx(styles.modal, {
              [styles.modal_opened]: isModalOpen,
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal__header}>
              {modalIngredient || modalOrderDetails ? (
                <h3
                  className={clsx(
                    styles.modal__title,
                    "text text_type_main-large"
                  )}
                >
                  {title}
                </h3>
              ) : (
                <></>
              )}

              <button
                className={styles.modal__close}
                type="button"
                aria-label="Закрыть модальное окно"
                onClick={() => handleModalClose()}
              >
                <CloseIcon type="primary" />
              </button>
            </div>

            {children}
          </div>
        </>
      )}
    </>,
    document.body
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  handleModalClose: PropTypes.func.isRequired,
};

export default Modal;
