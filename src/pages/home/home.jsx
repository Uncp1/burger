import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";
import Loader from "../../components/loader/loader.jsx";
import styles from "./home.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { ingredients, loading } = useSelector((state) => state.ingredients);

  return (
    <>
      <main className={`pb-10 ${styles.main}`}>
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
    </>
  );
};

export default HomePage;
