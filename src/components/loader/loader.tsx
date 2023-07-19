import PropTypes from "prop-types";
import { FC } from "react";
import styles from "./loader.module.css";

interface ILoader {
  loadingText: string;
}

const Loader: FC<ILoader> = ({ loadingText }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>

      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>

      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>

      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>

      <div className={styles.loader__circle}>
        <div className={styles.loader__inner}></div>
      </div>

      <p className={`text text_type_main-medium ${styles.loader__text}`}>
        {loadingText}
      </p>
    </div>
  );
};

Loader.propTypes = {
  loadingText: PropTypes.string.isRequired,
};

export default Loader;
