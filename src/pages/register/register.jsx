import { useState } from "react";
import styles from "./register.module.css";
import LoginForm from "../../components/login-form/login-form";

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
    <main>
      <LoginForm type="register" />
    </main>
  );
};

export default RegisterPage;
