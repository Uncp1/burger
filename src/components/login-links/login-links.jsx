import { NavLink } from "react-router-dom";
import styles from "./login-links.module.css";

const LoginLinks = ({ type }) => {
  const linksContnent = () => {
    switch (type) {
      case "login":
        return (
          <div className={`text text_type_main-small ${styles.container}`}>
            <p className={styles.item}>
              Вы — новый пользователь?
              <NavLink to="/register" className={styles.link}>
                Зарегистрироваться
              </NavLink>
            </p>

            <p className={styles.item}>
              Забыли пароль?
              <NavLink to="/forgot-password" className={styles.link}>
                Восстановить пароль
              </NavLink>
            </p>
          </div>
        );
      case "register":
        return (
          <div className={`text text_type_main-small ${styles.container}`}>
            <p className={styles.item}>
              Уже зарегистрированы?
              <NavLink to="/login" className={styles.link}>
                Войти
              </NavLink>
            </p>
          </div>
        );
      case "":
        return (
          <div className={`text text_type_main-small ${styles.container}`}>
            <p className={styles.item}>
              Уже зарегистрированы?
              <NavLink to="" className={styles.link}>
                Войти
              </NavLink>
            </p>
          </div>
        );
        return <div className="text text_type_main-small"></div>;
      default:
        return <h2>NOOOOO</h2>;
    }
  };
  return <>{linksContnent()}</>;
};

export default LoginLinks;
