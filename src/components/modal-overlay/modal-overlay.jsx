import styles from "./modal-overlay.module.css";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/slices/modal-slice";

const ModalOverlay = () => {
  const { isModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(styles.modal__overlay, {
        [styles.modal__overlay_opened]: isModalOpen,
      })}
      onClick={() => {
        dispatch(closeModal());
      }}
    ></div>
  );
};

export default ModalOverlay;
