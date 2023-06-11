import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./profile.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import LoginForm from "../../components/login-form/login-form";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";

const ProfilePage = () => {
  const dispatch = useDispatch();

  return (
    <main className={styles.container}>
      <div className={styles.menu}>
        <ProfileNavigation />
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <LoginForm type="profile" />
    </main>
  );
};

export default ProfilePage;
