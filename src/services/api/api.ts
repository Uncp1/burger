import { request } from '../../utils/request';
import { TOrderPromise } from '../../utils/types';

export const getIngredients = () => {
  return request('ingredients');
};

export const postOrder = ({
  order,
}: {
  order: string[];
}): Promise<TOrderPromise> => {
  return request('orders', {
    body: JSON.stringify({
      ingredients: order,
    }),
    method: 'POST',
  });
};

export const getOrder = ({ orderNumber }: { orderNumber: number }) =>
  request(`orders/${orderNumber}`);
