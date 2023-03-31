import styles from './burger-constructor.module.css';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = (props) => {
  return (
    <section className={`${styles.cart} mt-25`}>
      <div className={styles.cart__list}>

        <ConstructorElement
          extraClass={styles.cart__item_bun}
          key={"top"}
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail={props.data[0].image}
        />

        <ul className={styles.cart__ingredients}>
          {props.data
            .filter((item) => item.type !== "bun")
            .map((item) => {
              return (
                <li key={item._id} className={styles.cart__item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    key={item._id}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            })}
        </ul>

        <ConstructorElement
          extraClass={styles.cart__item_bun}
          key={"bottom"}
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={1255}
          thumbnail={props.data[0].image}
        />

        <div className={styles.cart__checkout}>
          <div className={styles.cart__total}>
            <p className="text text_type_digits-medium">610</p>

            <CurrencyIcon type="primary" />
          </div>

          <Button htmlType="button" type="primary" size="large">
                Оформить заказ
            </Button>
        </div>
      </div>
    </section>
  )

}  

export default BurgerConstructor;