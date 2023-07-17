import { request } from "../../utils/request";

export const getIngredients = () => {
  return request("ingredients");
};

export const postOrder = ({ order }: { order: string[] }) => {
  return request("orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
};

export const getOrder = ({ orderNumber }: { orderNumber: number }) =>
  request(`orders/${orderNumber}`);
