import { ingredientType } from '../../utils/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css'

const IngredientItem = ({ingredient}) => {
  const {name, price, image} = ingredient;

  return (
    <li className={styles.item}>
      <Counter count={1} size="default" extraClass="m-1" />

      <img className={`pl-4 pr-4 ${styles.image}`} src={image} alt={name}></img>

      <p className="text text_type_digits-default">{price}</p>

      <CurrencyIcon type="primary" />
    
      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
    </li>
  )
}

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientItem;