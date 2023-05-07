import { ingredientType } from "../../utils/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { openModal } from "../../services/slices/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";

const IngredientItem = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  const dispatch = useDispatch();

  const { counter } = useSelector((state) => state.cart);

  function handleClick() {
    dispatch(openModal(ingredient));
  }

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const ingredientCounter = useMemo(
    () => counter[ingredient._id] || 0,
    [ingredient._id, counter]
  );

  return (
    <li ref={dragRef} className={styles.item} onClick={() => handleClick()}>
      {ingredientCounter > 0 && (
        <Counter count={ingredientCounter} size="default" extraClass="m-1" />
      )}

      <img className={`pl-4 pr-4 ${styles.image}`} src={image} alt={name}></img>

      <p className="text text_type_digits-default">{price}</p>

      <CurrencyIcon type="primary" />

      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
    </li>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default IngredientItem;
