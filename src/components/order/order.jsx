import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { openModalOrderFromHistory } from "../../services/slices/modal-slice";
import styles from "./order.module.css";

const Order = ({ order }) => {
  const date = new Date(order.createdAt);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients } = useSelector((store) => store.ingredients);
  const orderIngredients = order.ingredients.map((orderIngredientId) =>
    ingredients.find((ingredient) => ingredient._id === orderIngredientId)
  );

  const handleClick = () => {
    dispatch(openModalOrderFromHistory(order));
    if (location.pathname === "/feed") {
      navigate(`/feed/${order.number}`, {
        state: { background: location },
      });
    } else if (location.pathname === "/profile/orders") {
      navigate(`/profile/orders/${order.number}`, {
        state: { background: location },
      });
    }
  };

  const checkTotalPrice = (ingredientsArray) =>
    ingredientsArray.reduce((prev, current) => prev + current.price, 0);
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
                className={styles.image}
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
    <article onClick={handleClick} className={styles.item}>
      <div className={styles.heading}>
        <div className={styles.numbers}>
          <span className="text text_type_digits-default">{order.number}</span>

          <FormattedDate
            date={date}
            className={clsx(
              "text",
              "text_type_main-default",
              "text_color_inactive"
            )}
          />
        </div>

        <div className={clsx(styles.heading)}>
          <h3 className="text text_type_main-medium">{order.name}</h3>
          <p
            className={clsx("text", "text_type_main-default", styles.status, {
              [styles.status_done]: order.status === "done",
            })}
          >
            {order.status === "created" && "Создан"}
            {order.status === "pending" && "Готовится"}
            {order.status === "done" && "Выполнен"}
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <ul className={` ${styles.ingredients_list}`}>{ingredientsOrder}</ul>

        <span className={clsx(styles.price)}>
          <span className={clsx("text", "text_type_digits-default")}>
            {checkTotalPrice(orderIngredients)}
          </span>
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </article>
  );
};

export default Order;
