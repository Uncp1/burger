import { ingredientType } from "../../utils/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { openModal } from "../../services/slices/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const IngredientItem = ({ ingredient }) => {
  const { name, price, image } = ingredient;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  function handleClick() {
    dispatch(openModal(ingredient));
  }

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });
  /*


  function setIngredientsState() {
    
    if(cart.ingredients !== undefined && cart.ingredients.length > 0) {
      return cart.ingredients.some(
        item => item._id === ingredient._id
      );
    }
    return false
  }

  function setBunState()  {
    if (cart.bun !== undefined && cart.bun !== null) {
      return cart.bun._id === ingredient._id;
    }
    return false;
  }

  function countIngredient(type) {
    if (type === 'bun') return 1;
    else return cart.ingredients.filter(item => item._id === ingredient._id).length;
  }



  const ingredientsState = setIngredientsState() || false;
  const bunState = setBunState() || false; */

  return (
    <li ref={dragRef} className={styles.item} onClick={() => handleClick()}>
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

/*

{
        (ingredientsState || bunState) && (
          <Counter
            //count={countIngredient(ingredient.type)} 
            size="default" 
            extraClass="m-1" 
          />
        )
      }

*/
