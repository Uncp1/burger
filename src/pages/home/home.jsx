import clsx from "clsx";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";
import Loader from "../../components/loader/loader.jsx";
import Modal from "../../components/modal/modal";
import styles from "./home.module.css";
import { fetchIngredients } from "../../services/slices/ingredient-slice";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const { ingredients, loading } = useSelector((state) => state.ingredients);
  const { isOrderConfirmation } = useSelector((state) => state.modal);

  return (
    <>
      <main className={clsx(styles.main, "pb-10")}>
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

      <Modal
        title={
          isOrderConfirmation ? "Идентификатор заказа" : "Детали ингредиента"
        }
      />
    </>
  );
};

export default HomePage;
