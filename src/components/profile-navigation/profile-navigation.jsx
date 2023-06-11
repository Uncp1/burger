import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../services/hooks/useLogout";
import styles from "./profile-navigation.module.css";

const ProfileNavigation = () => {
  const handleLogout = useLogout();
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            className={`page__link text text_type_main-medium ${styles.link}`}
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            className={`page__link text text_type_main-medium ${styles.link}`}
          >
            {" "}
            История заказов
          </NavLink>
        </li>
        <li className={styles.item}>
          <Button
            onClick={handleLogout}
            className={`page__link text text_type_main-medium ${styles.button} ${styles.link}`}
          >
            Выход
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNavigation;
