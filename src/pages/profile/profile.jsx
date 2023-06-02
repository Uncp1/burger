import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginForm from "../../components/login-form/login-form";

const ProfilePage = () => {
  const dispatch = useDispatch();

  return <LoginForm type="profile" />;
};

export default ProfilePage;
