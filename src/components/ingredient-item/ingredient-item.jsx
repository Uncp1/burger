import { ingredientType } from "../../utils/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { openModalIngredient } from "../../services/slices/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const IngredientItem = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { counter } = useSelector((state) => state.cart);

  const handleClick = useCallback(() => {
    dispatch(openModalIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  }, [dispatch, location, navigate, ingredient]);

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
