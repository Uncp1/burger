import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchLogout } from "../../services/slices/user-slice";
import { getCookie } from "../../utils/cookies";
import styles from "./profile-navigation.module.css";

const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((store) => store.user);

  const refreshToken = getCookie("refreshToken");
  const handleLogout = useCallback(() => {
    isUserLoggedIn &&
      refreshToken &&
      dispatch(fetchLogout({ token: refreshToken }));
  }, [dispatch, isUserLoggedIn, refreshToken]);
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to="/profile"
            className={`page__link text text_type_main-medium ${styles.link}`}
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/profile/orders"
            className={`page__link text text_type_main-medium ${styles.link}`}
          >
            {" "}
            История заказов
          </NavLink>
        </li>
        <li className={styles.item}>
          <Button
            htmlType="button"
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
