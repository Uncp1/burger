import { useState } from "react";
import styles from "./register.module.css";
import LoginForm from "../../components/login-form/login-form";
import LoginLinks from "../../components/login-links/login-links";

const RegisterPage = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className={styles.container}>
      <LoginForm type="register" />
      <LoginLinks type="register" />
    </main>
  );
};

export default RegisterPage;
