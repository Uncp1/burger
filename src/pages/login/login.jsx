import { Link } from "react-router-dom";
import styles from "./login.module.css";
import LoginForm from "../../components/login-form/login-form";

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <LoginForm type={"login"} />
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь?
        <Link to="/register">Зарегистрироваться </Link>
      </p>
    </main>
  );
};

export default LoginPage;
