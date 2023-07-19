import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart-element.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../services/slices/cart-slice";
import { FC, useRef } from "react";
import { TIngredientType } from "../../utils/types.js";

interface ICartElement {
  ingredient: TIngredientType;
  moveCartItem: (id: string, index: number) => void;
  index: number;
}

const CartElement: FC<ICartElement> = ({ ingredient, index, moveCartItem }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement | null>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "cartSort",
      item: { id: ingredient._id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, moveCartItem]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "cartSort",
      hover({ id }: { id: string }) {
        id !== ingredient._id && moveCartItem(id, index);
      },
    }),
    [moveCartItem]
  );

  const handleDelete = () => {
    dispatch(removeCartItem({ index: index, _id: ingredient._id }));
  };

  drag(drop(ref));

  return (
    <li
      className={`${styles.item} ${styles.item_draggable} ${
        isDragging && styles.item_dragging
      }`}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDelete}
      />
    </li>
  );
};

export default CartElement;
