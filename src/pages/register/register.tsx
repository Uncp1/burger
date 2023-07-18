import { FormEvent, useCallback, useEffect } from "react";
import styles from "./register.module.css";
import { fetchRegister } from "../../services/slices/login-slice";
import { useForm } from "../../services/hooks/useForm";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../services/hooks/hooks";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { inputValues, handleChange, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(
        fetchRegister({
          email: inputValues.email,
          password: inputValues.password,
          name: inputValues.name,
        })
      );
    },
    [dispatch, inputValues]
  );

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className="text text_type_main-large">Регистрация</h1>
        <Input
          value={inputValues.name || ""}
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          onChange={handleChange}
          minLength={2}
          maxLength={20}
          required
        />
        <EmailInput
          value={inputValues.email || ""}
          placeholder={"E-mail"}
          name={"email"}
          onChange={handleChange}
          required
        />
        <PasswordInput
          value={inputValues.password || ""}
          onChange={handleChange}
          placeholder={"Пароль"}
          name={"password"}
          minLength={2}
          maxLength={20}
          required
        />

        <Button htmlType="submit" type="primary" size="medium">
          Зарегестрироваться
        </Button>
      </form>

      <div className={`text text_type_main-small ${styles.container}`}>
        <p className={styles.item}>
          Уже зарегистрированы?
          <NavLink to="/login" className={styles.link}>
            Войти
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
