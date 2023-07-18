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
  accessToken?: string;
  refreshToken?: string;
  success: boolean;
  user?: TUSer;
};

export type TFormInput = {
  email?: string;
  password?: string;
  name?: string;
  token?: string;
};

export type TWebsocketActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};
