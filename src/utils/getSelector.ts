import { IngredientsState } from "../services/slices/ingredient-slice";
import { UserState } from "../services/slices/user-slice";
import { OrderState } from "../services/slices/order-slice";
import { ModalState } from "../services/slices/modal-slice";
import { CartState } from "../services/slices/cart-slice";
import { WebsocketState } from "../services/slices/webSocket-slice";
import { RootState } from "../services/store";

export const getIngredients = (store: RootState): IngredientsState =>
  store.ingredients;
export const getUser = (store: RootState): UserState => store.user;
export const getOrder = (store: RootState): OrderState => store.order;
export const getModal = (store: RootState): ModalState => store.modal;
export const getCart = (store: RootState): CartState => store.cart;
export const getWebsocket = (store: RootState): WebsocketState =>
  store.websocket;
// для рефакторинга на будущее
