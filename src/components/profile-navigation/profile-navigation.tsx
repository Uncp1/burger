import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { FC, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import { fetchLogout } from "../../services/slices/user-slice";
import { getCookie } from "../../utils/cookies";
import styles from "./profile-navigation.module.css";

const ProfileNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector((store) => store.user);

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
            end
            to="/profile"
            className={({ isActive }) =>
              clsx(
                "text",
                "text_type_main-medium",
                isActive ? styles.link_active : styles.link
              )
            }
          >
            Профиль
          </NavLink>
        </li>

        <li className={styles.item}>
          <NavLink
            end
            to="/profile/orders"
            className={({ isActive }) =>
              clsx(
                "text",
                "text_type_main-medium",
                isActive ? styles.link_active : styles.link
              )
            }
          >
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
