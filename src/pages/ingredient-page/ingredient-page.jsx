import styles from "./ingredient-page.module.css";
import Loader from "../../components/loader/loader.jsx";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IngredientInfo from "../../components/ingredient-info/ingredient-info";

const IngredientPage = () => {
  const params = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const ingredient = useMemo(
    () => ingredients.find((item) => item._id === params.id),
    [params.id, ingredients]
  );

  return ingredient ? (
    <section className={styles.section}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientInfo ingredient={ingredient} />
    </section>
  ) : (
    <Loader />
  );
};

export default IngredientPage;
