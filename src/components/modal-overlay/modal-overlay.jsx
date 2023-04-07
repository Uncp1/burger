import styles from './modal-overlay.module.css'
import clsx from 'clsx'
import PropTypes from 'prop-types';

const ModalOverlay = ({ isModalOpened, close}) => {
  return (
    <div
      className={clsx(
        styles.modal__overlay,
        { [styles.modal__overlay_opened]: isModalOpened }
      )}
      onClick={() => close()}
    >

    </div>
  )
}

ModalOverlay.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default ModalOverlay;