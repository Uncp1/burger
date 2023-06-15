import { Link } from "react-router-dom";
import styles from "./not-found.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const NotFound404 = () => {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.container}>
          <h1 className="text text_type_digits-large"> 404 </h1>
          <p className="text text_type_main-large">Lost in space</p>
        </div>
        <Link to="/" className={""}>
          <Button htmlType="button" type="primary" size="medium">
            Take me home
          </Button>
        </Link>
      </section>
    </main>
  );
};

export default NotFound404;
