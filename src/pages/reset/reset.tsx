import styles from "./reset.module.css";
import { fetchResetPassword } from "../../services/slices/password-slice";
import { useForm } from "../../services/hooks/useForm";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent } from "react";
import { useAppDispatch } from "../../services/hooks/hooks";

const ResetPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { inputValues, handleChange } = useForm();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      fetchResetPassword({
        password: inputValues.password,
        token: inputValues.token,
      })
    );
    navigate("/login");
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          value={inputValues.password || ""}
          onChange={handleChange}
          name={"password"}
          minLength={2}
          maxLength={20}
          required
        />
        <Input
          value={inputValues.token || ""}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          name="token"
        />

        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className={`text text_type_main-small ${styles.container}`}>
        <p className={styles.item}>
          Вспомнили пароль?
          <NavLink to="/login" className={styles.link}>
            Войти
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default ResetPage;
