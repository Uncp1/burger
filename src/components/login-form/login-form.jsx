import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./login-form.module.css";

const LoginForm = ({ type }) => {
  const formContent = () => {
    switch (type) {
      case "login":
        return (
          <>
            <h1 className="text text_type_main-large">Вход</h1>
            <EmailInput />
            <PasswordInput />
            <NavLink to={"/"}>
              <Button htmlType="button" type="primary" size="medium">
                Войти
              </Button>
            </NavLink>
          </>
        );
      case "register":
        return (
          <>
            <h1 className="text text_type_main-large">Регистрация</h1>
            <Input
              type={"text"}
              //onChange={onChange}
              //value={value.name}
              placeholder={"Имя"}
              name={"name"}
              size={"default"}
            />
            <EmailInput
              //onChange={onChange}
              //value={value.email}
              name={"email"}
              placeholder="Почта"
            />
            <PasswordInput
              //onChange={onChange}
              //value={value.password}
              name={"password"}
              placeholder="Пароль"
            />

            <NavLink to={"/"}>
              <Button htmlType="button" type="primary" size="medium">
                Зарегестрироваться
              </Button>
            </NavLink>
          </>
        );
      case "profile":
        return (
          <>
            <Input type={"text"} placeholder={"Имя"} icon={"EditIcon"} />
            <EmailInput icon={"EditIcon"} />
            <PasswordInput icon={"EditIcon"} />
          </>
        );
      case "forgot":
        return <></>;
      case "reset":
        return (
          <>
            <h1 className="text text_type_main-large">Восстановление пароля</h1>
            <PasswordInput />
            <Input />
            <NavLink to="/login">
              <Button htmlType="button" type="primary" size="medium">
                Сохранить
              </Button>
            </NavLink>
          </>
        );
      default:
        return <h1>a secret dark place</h1>;
    }
  };

  return <form className={styles.form}>{formContent()}</form>;
};

LoginForm.propTypes = {
  type: PropTypes.oneOf(["login", "register", "profile", "forgot", "reset"]),
};

export default LoginForm;
