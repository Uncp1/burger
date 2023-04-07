import { useState } from 'react';
import { cartData } from '../data'
export const useCart = () => {
  const [cart, setCart] = useState(cartData);

  return { cart, setCart };
};