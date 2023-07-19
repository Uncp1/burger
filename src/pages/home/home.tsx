import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Loader from "../../components/loader/loader";
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from "react";
import { useAppSelector } from "../../services/hooks/hooks";

const HomePage: FC = () => {
  const { ingredients, loading } = useAppSelector((state) => state.ingredients);

  return (
    <main className={styles.main}>
      {!loading && ingredients.length > 0 ? (
        <div className={styles.main__container}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      ) : (
        <Loader loadingText={"Идет загрузка..."}></Loader>
      )}
    </main>
  );
};

export default HomePage;
