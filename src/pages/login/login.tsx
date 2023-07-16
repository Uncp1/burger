import styles from "./login.module.css";
import { fetchLogin } from "../../services/slices/user-slice";
import { FC, FormEvent, useCallback, useEffect } from "react";
import { useForm } from "../../services/hooks/useForm";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../services/hooks/hooks";

const LoginPage: FC = () => {
  const { inputValues, handleChange, errors, isValid, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        fetchLogin({
          email: inputValues.email,
          password: inputValues.password,
        })
      );
    },
    [inputValues.email, inputValues.password, dispatch]
  );

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-large">Вход</h1>
        <EmailInput
          value={inputValues.email || ""}
          placeholder={"E-mail"}
          name={"email"}
          error={!!errors.email}
          errorText={errors.email}
          onChange={handleChange}
          required
        />
        <PasswordInput
          value={inputValues.password || ""}
          onChange={handleChange}
          placeholder={"Пароль"}
          name={"password"}
          error={!!errors.password}
          errorText={errors.password}
          minLength={2}
          maxLength={20}
          required
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
        >
          Войти
        </Button>
      </form>

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
    </main>
  );
};

export default LoginPage;
