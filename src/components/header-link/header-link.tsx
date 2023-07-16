import clsx from "clsx";
import styles from "./header-link.module.css";
import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";

interface IHeaderLink {
  text: string;
  children: ReactNode;
  address: string;
  active?: boolean;
}

const HeaderLink: FC<IHeaderLink> = ({ text, children, address }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        clsx(
          styles.link,
          isActive ? styles.link_active : "",
          "pt-4",
          "pr-5",
          "pb-4",
          "pl-5"
        )
      }
    >
      {children}
      <span className="ml-2">{text}</span>
    </NavLink>
  );
};

export default HeaderLink;
