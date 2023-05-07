import styles from "./ingredients-type.module.css";
import PropTypes from "prop-types";

const IngredientsType = ({ type, name, children }) => {
  return (
    <>
      <h2 className="text text_type_main-medium" id={type}>
        {name}
      </h2>

      <ul className={styles.list}>{children}</ul>
    </>
  );
};

IngredientsType.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientsType;
