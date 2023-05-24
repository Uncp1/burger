import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";

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
    <div>
      <form onSubmit={onSubmit}>
        <h1>Регистрация</h1>
        <Input
          type={"text"}
          onChange={onChange}
          value={value.name}
          placeholder={"Имя"}
          name={"name"}
          size={"default"}
        />
        <EmailInput
          onChange={onChange}
          value={value.email}
          name={"email"}
          placeholder="Почта"
        />
        <PasswordInput
          onChange={onChange}
          value={value.password}
          name={"password"}
          placeholder="Пароль"
        />
        <Button>Зарегестрироваться</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
