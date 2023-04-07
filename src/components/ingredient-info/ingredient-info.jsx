import { ingredientType } from '../../utils/types.js';
import styles from './ingredient-info.module.css';

const IngredientInfo = (props) => {
  
  return(
    <div className={styles.ingredientInfo}>
      <picture className={styles.ingredientInfo__picture}>
        <img
          className={styles.ingredientInfo__image}
          alt={props.data.name}
          src={props.data.image}
        />
      </picture>
      <div
        className={`${styles.ingredientInfo__content} 'mt-4'`}
      >
        <h4
          className={`${styles.ingredientInfo__title} 'text' 'text_type_main-medium'`}
        >
          {props.data.name}
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
          <span className='text_type_digits-default'>
              {props.data.calories}
          </span>

          <span className='text_type_digits-default'>
              {props.data.proteins}
          </span>

          <span className='text_type_digits-default'>
            {props.data.fat}
          </span>

          <span className='text_type_digits-default'>
              {props.data.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  )
}

IngredientInfo.propTypes = {
  ingredient: ingredientType || null
};

export default IngredientInfo;