import clsx from 'clsx';
import styles from './header-link.module.css';
import { NavLink } from 'react-router-dom';
import { FC, MouseEventHandler, ReactNode } from 'react';

interface IHeaderLink {
  text: string;
  children: ReactNode;
  address: string;
  active?: boolean;
  onClick?: MouseEventHandler;
}

const HeaderLink: FC<IHeaderLink> = ({ text, children, address, onClick }) => {
  return (
    <NavLink
      to={address}
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          styles.link,
          isActive ? styles.link_active : '',
          'pt-4',
          'pr-5',
          'pb-4',
          'pl-5'
        )
      }
    >
      {children}
      <span className="ml-2">{text}</span>
    </NavLink>
  );
};

export default HeaderLink;
