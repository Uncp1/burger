import { Link } from "react-router-dom";
import styles from "./login.module.css";
import LoginForm from "../../components/login-form/login-form";
import LoginLinks from "../../components/login-links/login-links";

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <LoginForm type={"login"} />
      <LoginLinks type={"login"} />
    </main>
  );
};

export default LoginPage;
