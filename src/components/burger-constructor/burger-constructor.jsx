import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import { cartType } from '../../utils/types.js';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ cart, openModal }) => {
  return (
    <section className={`${styles.cart} mt-25`}>
      <div className={styles.cart__list}>

        <ConstructorElement
          extraClass={styles.cart__item}
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail={cart.bun.image}
        />

        <ul className={styles.cart__ingredients}>
          {cart.ingredients
            .map((item, index) => {
              return (
                <li key={item._id + index} className={styles.cart__item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
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
          price={1255}
          thumbnail={cart.bun.image}
        />

        <div className={styles.cart__checkout}>
          <div className={styles.cart__total}>
            <p className="text text_type_digits-medium">9000</p>

            <CurrencyIcon type="primary" />
          </div>

          <Button 
            htmlType="button" type="primary" size="large"
            onClick={() => openModal('cart', true)}
          >
                Оформить заказ
            </Button>
        </div>
      </div>
    </section>
  )

}  
BurgerConstructor.propTypes = {
  cart: cartType.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;