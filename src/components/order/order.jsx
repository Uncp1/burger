import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./order.module.css";

const Order = ({ order }) => {
  console.log(order);
  const { ingredients } = useSelector((store) => store.ingredients);
  const ingredientsOrder = useMemo(
    () =>
      order.ingredients.slice(0, 6).map((item, index) => {
        const ingredientsItem = ingredients.find((i) => i._id === item);
        const remainingIngredients = order.ingredients.slice(6).length;
        const transformValue = `translateX(-${16 * index}px)`;
        const zIndexValue = -index;

        return (
          ingredientsItem && (
            <li
              style={{
                transform: transformValue,
                zIndex: zIndexValue,
              }}
              key={index}
            >
              <img
                src={ingredientsItem.image}
                alt={`Ингредиент ${ingredientsItem.name}`}
              />
              {index === 5 && remainingIngredients !== 0 && (
                <p
                  className={`
                    ${styles.remaining_ingredients}
                    text_type_digits-default
                    text`}
                >
                  +{remainingIngredients}
                </p>
              )}
            </li>
          )
        );
      }),
    [ingredients, order.ingredients]
  );
  return (
    <>
      <p>{order.number}</p>
      <ul>{ingredientsOrder}</ul>
    </>
  );
};

export default Order;
