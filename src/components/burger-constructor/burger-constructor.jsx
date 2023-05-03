import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import { CartContext } from '../../context/cartContext.js';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect  } from 'react';
import { api } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';

const BurgerConstructor = () => {
  //const { cart, changeCheckout, checkout } = useContext(CartContext);

  const dispatch = useDispatch();
  const cart = useSelector((state => state.cart));

  /* const changeSum = useCallback(() => {
    const sum = [];

    if (cart.bun !== null && cart.bun) {
      sum.push(cart.bun.price);
      sum.push(cart.bun.price);
    }

    if (cart.ingredients.length > 0) {
      cart.ingredients.forEach(item => sum.push(item.price));
    }

    return sum;
  }, [cart]); */


  useEffect(() => {
    //const sum = changeSum();
   // const amount = sum.reduce((acc, curr) => acc + curr);
   // changeCheckout({ type: 'add', value: amount });
    //return () => changeCheckout({ type: 'reset' });
  }, [cart]);

  const createOrder = () => {
    const orderDetails = { 'ingredients': [] };
    cart.ingredients.forEach(item => orderDetails.ingredients.push(item._id));
    orderDetails.ingredients.push(cart.bun._id);
    orderDetails.ingredients.push(cart.bun._id);
    return orderDetails;
  };
 
  const handleCreateOrder = async () => {
    try {
      const order = createOrder();
      const res = await api.createOrder(order);
      cart.orderNumber = res.order.number.toString();
      if (cart.orderNumber !== null) {}//openModal('cart', true);
      else console.error('Ошибка в формировании номера заказа.');
      cart.ingredients = [];
      cart.bun = null;
      //changeCheckout({ type: 'reset' });
    } catch (e) {
      console.log(e);
    }
  };


  console.log(cart.bun);
  return (
   
    <section className={`${styles.cart} mt-25`}>
      {
          !cart.bun
            ?
            <h2 className='text text_type_main-large'>
              Выберите булку
            </h2>

            :<div className={styles.cart__list}>
              <ConstructorElement
                extraClass={styles.cart__item}
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={cart.bun.price}
                thumbnail={cart.bun.image}
              />

              <ul className={styles.cart__ingredients}>
                {cart.ingredients
                  .map((item, index) => {
                    return (
                      <li key={item._id + index} className={styles.cart__item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          dragable 
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                        />
                      </li>
                    );
                  })}
              </ul>
              

              <ConstructorElement
                extraClass={styles.cart__item}
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={cart.bun.price}
                thumbnail={cart.bun.image}
              />
            </div>
      }

       

        <div className={styles.cart__checkout}>
          <div className={styles.cart__total}>
            <p className="text text_type_digits-medium">{cart.cartPrice}</p>

            <CurrencyIcon type="primary" />
          </div>

          <Button 
            htmlType="button" type="primary" size="large"
            onClick={handleCreateOrder}
          >
            Оформить заказ
          </Button>
        </div>
    </section>
    
  )
}  
BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;