import clsx from 'clsx';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import styles from './app.module.css';
import { useEffect } from 'react';

import Loader from '../loader/loader.jsx';

import  { fetchIngredients }  from '../../services/slices/ingredient-slice'
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());  
  }, []);

  const { ingredients, loading } = useSelector(state => state.ingredients);
  const cart = useSelector((state => state.cart));
  const { isOrderConfirmation } = useSelector((state => state.modal));


  return (
    <>
      <Header />

      <main className={clsx(styles.main, 'pb-10')}>
        {
          !loading && ingredients.length > 0
          ?
          <div className={styles.main__container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>

          :<Loader loadingText={'Идет загрузка...'}></Loader>
        }
      </main>

      <Modal
        title={isOrderConfirmation ? 'Идентификатор заказа' : 'Детали ингредиента'}
        />
    </>
  );
}

export default App;



