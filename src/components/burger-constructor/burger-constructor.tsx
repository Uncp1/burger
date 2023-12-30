import styles from './burger-constructor.module.css';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useCallback, FC } from 'react';
import { createOrder } from '../../services/slices/order-slice';
import { useDrop } from 'react-dnd';
import { openModalOrder } from '../../services/slices/modal-slice';
import {
  addCartItem,
  emptyCart,
  removeCartItem,
  sortCartItem,
} from '../../services/slices/cart-slice';
import uuid from 'react-uuid';
import CartElement from '../cart-element/cart-element';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { excludeUndefinedResult } from '../../utils/excludeUndefinedResult';

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { orderFetchRequest } = useAppSelector((state) => state.order);
  const { isUserLoggedIn } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const isButtonDisabled = useMemo(
    () => !!(cart.bun === null || cart.ingredients.length === 0),
    [cart]
  );

  const redirectToLogin = useCallback(() => {
    navigate('/login', {
      replace: true,
      state: { background: location.pathname },
    });
  }, [location.pathname, navigate]);

const handleCreateOrder = () => {
    isUserLoggedIn
      ? cart.bun !== null &&
        dispatch(createOrder(cart)).then(() => {
          dispatch(openModalOrder());
          dispatch(emptyCart());
        })
      : redirectToLogin();
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      if (typeof ingredient === 'object' && ingredient !== null)
        dispatch(
          addCartItem({
            ...ingredient,
            _uid: uuid(),
          })
        );
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const findCartItem = useCallback(
    (id: string) => {
      const ingredient = excludeUndefinedResult(
        cart.ingredients.find((item) => item._id === id),
        'Ingredient not found'
      );
      return {
        ingredient,
        index: cart.ingredients.indexOf(ingredient),
      };
    },
    [cart]
  );

  const moveCartItem = useCallback(
    (id: string, atIndex: number) => {
      const { ingredient, index } = findCartItem(id);
      dispatch(removeCartItem({ index, _id: id }));
      dispatch(sortCartItem({ index, atIndex, ingredient }));
    },
    [dispatch, findCartItem]
  );

  const cartPrice = useMemo(() => {
    if (cart.bun !== null) {
      const bunPrice = cart.bun.price;
      const ingredientsPrice = cart.ingredients.reduce(
        (acc: number, current) => acc + current.price,
        0
      );
      return bunPrice + ingredientsPrice + bunPrice;
    } else {
      return 0;
    }
  }, [cart.bun, cart.ingredients]);

  return (
    <section
      className={clsx(
        styles.cart,
        'mt-25',
        isHover && styles.cart__list_hover_active
      )}
      ref={dropTarget}
    >
      {!cart.bun ? (
        <h2 className="text text_type_main-large">Выберите булку</h2>
      ) : (
        <ul className={styles.cart__list}>
          <li className={styles.cart__item}>
            <ConstructorElement
              extraClass={styles.cart__bun}
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={cart.bun.price}
              thumbnail={cart.bun.image}
            />
          </li>

          <ul className={styles.cart__ingredients}>
            {cart.ingredients.map((item, index) => {
              return (
                <CartElement
                  moveCartItem={moveCartItem}
                  key={item._uid}
                  index={index}
                  ingredient={item}
                />
              );
            })}
          </ul>

          <li className={styles.cart__item}>
            <ConstructorElement
              extraClass={styles.cart__bun}
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={cart.bun.price}
              thumbnail={cart.bun.image}
            />
          </li>
        </ul>
      )}

      <div className={styles.cart__checkout}>
        <div className={styles.cart__total}>
          <p className="text text_type_digits-medium">{cartPrice}</p>

          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleCreateOrder}
          disabled={isButtonDisabled}
        >
          {orderFetchRequest ? 'Оформляем заказ...' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
