import styles from "./ingredients-type.module.css";
import { FC } from "react";

const IngredientsType: FC = ({ type, name, children }: any) => {
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
