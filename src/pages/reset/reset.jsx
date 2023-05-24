import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

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
    <>
      <h1>Восстановление пароля</h1>
      <PasswordInput />
      <Input />
      <Button />
    </>
  );
};

export default ResetPage;
