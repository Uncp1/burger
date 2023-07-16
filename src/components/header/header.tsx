import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import styles from "./header.module.css";
import HeaderLink from "../header-link/header-link";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header
      className={clsx(
        //this is wack
        styles.header,
        "text",
        "text_type_main-default",
        "pt-4",
        "pb-4"
      )}
    >
      <div className={styles.content}>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <HeaderLink address="/" text="Конструктор">
                <BurgerIcon type="primary" />
              </HeaderLink>
            </li>

            <li>
              <HeaderLink address="/feed" text="Лента заказов">
                <ListIcon type="secondary" />
              </HeaderLink>
            </li>
          </ul>
        </nav>

        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>

        <div className={styles.profile}>
          <HeaderLink address="/profile" text="Личный кабинет">
            <ProfileIcon type="secondary" />
          </HeaderLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
