import {  useEffect, useReducer, useState } from 'react';

export const useCart = (ingredients) => {
  
  const chooseBun = () => {
    return ingredients[0].items[1]
  };

  const chooseIngredients = () => {
    if (ingredients[1].items.length > 0 && ingredients[2].items.length > 0) {
    return [ingredients[1].items[2], ingredients[2].items[0]];}
    else return undefined;
  };
  const initialState = { cartPrice: 0 };

  const reducer = (checkout, action) => {
    switch (action.type) {
      case 'add':
        return { cartPrice: checkout.cartPrice + action.value };
      case 'remove':
        return { cartPrice: checkout.cartPrice - action.value };
      case 'reset':
        return { cartPrice: 0 };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [checkout, changeCheckout] = useReducer(reducer, initialState);
  
  const [cart, setCart] =  useState({
      orderNumber: null,
      bun: undefined,
      ingredients: undefined,
  })
   
  useEffect(() => {
    setCart ({
      orderNumber: null,
      bun: chooseBun(),
      ingredients: chooseIngredients(),
    });
  }, [ingredients]) 

  return { cart, changeCheckout, checkout };
};