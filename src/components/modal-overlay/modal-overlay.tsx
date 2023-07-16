import styles from "./modal-overlay.module.css";
import clsx from "clsx";
import { FC } from "react";
import { useAppSelector } from "../../services/hooks/hooks";

interface IModalOverlay {
  handleModalClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ handleModalClose }) => {
  const { isModalOpen } = useAppSelector((state) => state.modal);

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

export default ModalOverlay;
