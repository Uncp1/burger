import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart-element.module.css";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../services/slices/cart-slice";
import { useRef } from "react";
import { ingredientType } from "../../utils/types.js";

const CartElement = ({ ingredient, index, moveCartItem }) => {
  const dispatch = useDispatch();
  const ref = useRef();

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
      hover({ id }) {
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
      className={clsx(
        styles.item,
        styles.item_draggable,
        isDragging && styles.item_dragging
      )}
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

CartElement.propTypes = {
  ingredient: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  moveCartItem: PropTypes.func.isRequired,
};

export default CartElement;
