import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './header.module.css';
import HeaderLink from '../header-link/header-link';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { fetchGetUser } from '../../services/slices/user-sclice';
import { PATH } from '../../utils/config';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector((state) => state.login);
  const navigate = useNavigate();

  const handleOpenProfile = () => {
    console.log(isUserLoggedIn);

    if (!isUserLoggedIn) {
      navigate(PATH.LOGIN);
    } else dispatch(fetchGetUser()); // can be inefficient but it prevents empty inputs
  };

  return (
    <header
      className={clsx(
        //this is wack
        styles.header,
        'text',
        'text_type_main-default',
        'pt-4',
        'pb-4'
      )}
    >
      <div className={styles.content}>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <HeaderLink address={PATH.HOME} text="Конструктор">
                <BurgerIcon type="primary" />
              </HeaderLink>
            </li>

            <li>
              <HeaderLink address={PATH.FEED} text="Лента заказов">
                <ListIcon type="secondary" />
              </HeaderLink>
            </li>
          </ul>
        </nav>

        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>

        <div className={styles.profile}>
          <HeaderLink
            onClick={() => handleOpenProfile()}
            address={PATH.PROFILE}
            text="Личный кабинет"
          >
            <ProfileIcon type="secondary" />
          </HeaderLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
