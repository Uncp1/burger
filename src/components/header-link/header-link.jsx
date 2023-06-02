import clsx from "clsx";
import styles from "./header-link.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeaderLink = ({ text, children, active, address }) => {
  return (
    <Link
      to={address}
      className={clsx(
        styles.link,
        active && styles.link_active,
        "pt-4",
        "pr-5",
        "pb-4",
        "pl-5"
      )}
    >
      {children}
      <span className="ml-2">{text}</span>
    </Link>
  );
};

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  address: PropTypes.string.isRequired,
};

HeaderLink.default = {
  active: false,
};

export default HeaderLink;
