import styles from "./ingredient-page.module.css";
import Loader from "../../components/loader/loader";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import IngredientInfo from "../../components/ingredient-info/ingredient-info";
import { useAppSelector } from "../../services/hooks/hooks";

const IngredientPage: FC = () => {
  const params = useParams();
  const { ingredients } = useAppSelector((store) => store.ingredients);
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
    <Loader loadingText="Идет загрузка" />
  );
};

export default IngredientPage;
