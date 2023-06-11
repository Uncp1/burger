import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./login-form.module.css";

const LoginForm = ({
  type,
  handleChange,
  handleSubmit,
  inputValues,
  errors,
  isValid,
}) => {
  const formContent = () => {
    switch (type) {
      case "login":
        return (
          <>
            <h1 className="text text_type_main-large">Вход</h1>
            <EmailInput
              value={inputValues.email}
              placeholder={"E-mail"}
              name={"email"}
              error={!!errors.email}
              errorText={errors.email}
              onChange={handleChange}
              required
            />
            <PasswordInput
              value={inputValues.password}
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
          </>
        );
      case "register":
        return (
          <>
            <h1 className="text text_type_main-large">Регистрация</h1>
            <Input
              value={inputValues.name}
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
              value={inputValues.email}
              placeholder={"E-mail"}
              name={"email"}
              error={!!errors.email}
              errorText={errors.email}
              onChange={handleChange}
              required
            />
            <PasswordInput
              value={inputValues.password}
              onChange={handleChange}
              placeholder={"Пароль"}
              name={"password"}
              error={!!errors.password}
              errorText={errors.password}
              minLength={2}
              maxLength={20}
              required
            />

            <Button htmlType="submit" type="primary" size="medium">
              Зарегестрироваться
            </Button>
          </>
        );
      case "profile":
        return (
          <>
            <Input
              onChange={handleChange}
              type={"text"}
              placeholder={"Имя"}
              icon={"EditIcon"}
            />
            <EmailInput onChange={handleChange} icon={"EditIcon"} />
            <PasswordInput onChange={handleChange} icon={"EditIcon"} />
          </>
        );
      case "forgot":
        return <></>;
      case "reset":
        return (
          <>
            <h1 className="text text_type_main-large">Восстановление пароля</h1>
            <PasswordInput onChange={handleChange} />
            <Input onChange={handleChange} />

            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </>
        );
      default:
        return <h1>a secret dark place</h1>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {formContent()}
    </form>
  );
};

LoginForm.propTypes = {
  type: PropTypes.oneOf(["login", "register", "profile", "forgot", "reset"]),
};

export default LoginForm;
