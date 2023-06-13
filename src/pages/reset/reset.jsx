import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./reset.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginForm from "../../components/login-form/login-form";

const ResetPage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    password: "",
    code: "",
  });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //dispatch(resetPassword(value.password, value.code));
  };

  return (
    <main className={styles.main}>
      <LoginForm type={"reset"} />
    </main>
  );
};

export default ResetPage;
