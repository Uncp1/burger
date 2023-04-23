import useIngredients  from '../../utils/hooks/useIngredients.js';
import useModal from '../../utils/hooks/useModal.js';
import clsx from 'clsx';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import styles from './app.module.css';
import { CartContext } from '../../context/cartContext.js';
import { useCart } from '../../utils/hooks/useCart';
import { useMemo } from 'react';
import { IngredientsContext } from '../../context/ingredientsContext.js';
import Loader from '../loader/loader.jsx';


const App = () => {
  
  const { ingredients, loading  } = useIngredients();
  const ingredientsValue = useMemo(() => {
    return { ingredients };
  }, [ingredients]);

  const { cart, changeCheckout, checkout } = useCart(ingredients);
  const cartValue = useMemo(() => {
    return { cart, changeCheckout, checkout };
  }, [cart, changeCheckout, checkout]);  

  const { ingredientInfo, orderInfo, isModalOpened, close, open } = useModal();
 
  return (
    <>
      <Header />

      <main className={clsx(styles.main, 'pb-10')}>
        {
          !loading && (cart.bun !== undefined) && (cart.ingredients !== undefined)
          ?
          <div className={styles.main__container}>
            <IngredientsContext.Provider value={ingredientsValue}>
              <CartContext.Provider value={cartValue}>
                <BurgerIngredients openModal ={open}/>

                <BurgerConstructor  openModal ={open}/>  
              </CartContext.Provider>  
            </IngredientsContext.Provider>
          </div>

          :<Loader loadingText={'Идет загрузка...'}></Loader>
        }
      </main>
     
      <Modal
        isModalOpened={isModalOpened}
        close={close}
        title={ingredientInfo ? 'Детали ингредиента' : ''}
        orderInfo={orderInfo}
        orderNumber={cart.orderNumber}
        ingredientInfo={ingredientInfo}
        />
    </>
  );
}

export default App;
