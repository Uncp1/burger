import styles from "./ingredients-type.module.css";
import { FC, ReactNode } from "react";

interface IIngredientsType {
  type: string;
  name: string;
  children: ReactNode;
}

const IngredientsType: FC<IIngredientsType> = ({ type, name, children }) => {
  return (
    <>
      <h2 className="text text_type_main-medium" id={type}>
        {name}
      </h2>

      <ul className={styles.list}>{children}</ul>
    </>
  );
};

export default IngredientsType;
