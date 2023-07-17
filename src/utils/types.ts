import { type } from "os";
import PropTypes from "prop-types";

const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isLocked: PropTypes.bool,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

export type TIngredientType = {
  _id: string;
  name: string;
  type: "main" | "bun" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: string | number;
  _uid?: string;
  quantity?: number;
};

export type TOrderType = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "done" | "pending" | "created";
  updatedAt: string;
  _id: string;
};

export type TCart = {
  bun: TIngredientType | null;
  ingredients: TIngredientType[];
};
export type TOrderPromise = {
  name: string;
  order: TOrderType;
  success: boolean;
};

export type TUSer = {
  email: string;
  name: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TFormPromise = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUSer;
};

export type TFormInput = {
  email?: string;
  password?: string;
};

const orderType = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["done", "pending", "created"]).isRequired,
  updatedAt: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
});

export { ingredientType, orderType };
