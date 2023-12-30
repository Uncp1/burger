import styles from './profile.module.css';
import ProfileNavigation from '../../components/profile-navigation/profile-navigation';

import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks/hooks';
import { FC } from 'react';


const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAppSelector((store) => store.user);
  if (!isUserLoggedIn) {
    navigate('/login');
  }

  return (
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
  );
};

export default ProfilePage;
