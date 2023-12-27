import styles from './profile.module.css';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';
import { Outlet } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { useAppSelector } from '../../services/hooks/hooks';

const ProfilePage = () => {
  const { isUserLoggedIn } = useAppSelector((store) => store.user);

  return isUserLoggedIn ? (
    <main className={styles.container}>
      <div className={styles.menu}>
        <ProfileNavigation />
        <p
          className={`text text_type_main-default text_color_inactive ${styles.reminder}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <Outlet />
    </main>
  ) : (
    <Loader loadingText="Загрузка профиля" />
  );
};

export default ProfilePage;
