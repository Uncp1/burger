import { RootState } from "../services/store";

export const getIngredients = (store: RootState) => store.ingredients;
export const getUser = (store: RootState) => store.user;
export const getOrder = (store: RootState) => store.order;
export const getModal = (store: RootState) => store.modal;
export const getCart = (store: RootState) => store.cart;
export const getWebsocket = (store: RootState) => store.websocket;
// для рефакторинга на будущее
