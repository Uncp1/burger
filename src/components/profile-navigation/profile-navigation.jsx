import { NavLink } from "react-router-dom";
import styles from "./profile-navigation.module.css";

const ProfileNavigation = () => {
  return (
    <nav>
      <ul className={`page__list ${styles.list}`}>
        <li>
          <NavLink></NavLink>
        </li>
        <li>
          <NavLink></NavLink>
        </li>
        <li>
          <NavLink to="/">Выход</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNavigation;
