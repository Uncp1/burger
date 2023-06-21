import styles from "./modal-overlay.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ModalOverlay = ({ handleModalClose }) => {
  const { isModalOpen } = useSelector((state) => state.modal);

  return (
    <div
      className={clsx(styles.modal__overlay, {
        [styles.modal__overlay_opened]: isModalOpen,
      })}
      onClick={() => {
        handleModalClose();
      }}
    ></div>
  );
};

ModalOverlay.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
