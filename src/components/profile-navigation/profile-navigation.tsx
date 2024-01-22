import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { fetchLogout } from '../../services/slices/login-slice';
import { getCookie } from '../../utils/cookies';
import styles from './profile-navigation.module.css';
import { PATH } from '../../utils/config';

const ProfileNavigation: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAppSelector((store) => store.login);

  const refreshToken = getCookie('refreshToken');
  const handleLogout = () => {
    isUserLoggedIn && refreshToken && dispatch(fetchLogout({ dispatch }));

    navigate(PATH.HOME);
  };

  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            end
            to="/profile"
            className={({ isActive }) =>
              clsx(
                'text',
                'text_type_main-medium',
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
                'text',
                'text_type_main-medium',
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
