import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import LoginForm from "../../components/login-form/login-form";
import ProfileNavigation from "../../components/profile-navigation/profile-navigation";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.menu}>
        <ProfileNavigation />
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <LoginForm type="profile" />

      <Outlet />
    </main>
  );
};

export default ProfilePage;
