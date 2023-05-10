import clsx from "clsx";
import Header from "../header/header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import Modal from "../modal/modal.jsx";
import styles from "./app.module.css";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from "../loader/loader.jsx";
import { fetchIngredients } from "../../services/slices/ingredient-slice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  const { ingredients, loading } = useSelector((state) => state.ingredients);
  const { isOrderConfirmation } = useSelector((state) => state.modal);

  return (
    <>
      <Header />

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

export default App;
