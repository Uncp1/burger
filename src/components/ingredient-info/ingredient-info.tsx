import { FC } from "react";
import styles from "./ingredient-info.module.css";
import { TIngredientType } from "../../utils/types";

const IngredientInfo: FC<{ ingredient: TIngredientType }> = ({
  ingredient,
}) => {
  return (
    <div className={styles.ingredientInfo}>
      <picture className={styles.ingredientInfo__picture}>
        <img
          className={styles.ingredientInfo__image}
          alt={ingredient.name}
          src={ingredient.image}
        />
      </picture>
      <div className={`${styles.ingredientInfo__content} 'mt-4'`}>
        <h4
          className={`${styles.ingredientInfo__title} 'text' 'text_type_main-medium'`}
        >
          {ingredient.name}
        </h4>
        <div
          className={`
            ${styles.ingredientInfo__nutritionFacts}
            'mt-8'
            'text'
            'text_type_main-default'
            'text_color_inactive'
          `}
        >
          <span>Калории,ккал</span>
          <span>Белки, г</span>
          <span>Жиры, г</span>
          <span>Углеводы, г</span>
          <span className="text_type_digits-default">
            {ingredient.calories}
          </span>

          <span className="text_type_digits-default">
            {ingredient.proteins}
          </span>

          <span className="text_type_digits-default">{ingredient.fat}</span>

          <span className="text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientInfo;
