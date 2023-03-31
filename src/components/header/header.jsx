import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import clsx from 'clsx';
import styles from './header.module.css';

import HeaderLink from '../header-link/header-link';


const Header = () => {
  return(
    <header className={clsx(styles.header, 'text', 'text_type_main-default', 'pt-4', 'pb-4')}>
      <div className={styles.content}>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <HeaderLink text='Конструктор'>
                <BurgerIcon />
              </HeaderLink>
            </li>

            <li>
              <HeaderLink text={'Лента заказов'}>
                <ListIcon />
              </HeaderLink>  
            </li>
          </ul>
        </nav>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.profile}>
          <HeaderLink text={'Лента заказов'}>
            <ProfileIcon type="secondary"/>
          </HeaderLink>
        </div>
      </div>
    </header> 
  )
}

export default Header;