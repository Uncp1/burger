
import { useEffect, useState } from 'react';
import useIngredients  from '../../utils/hooks/use-ingredients.js';
import useModal from '../../utils/hooks/use-modal.js';
import clsx from 'clsx';
import Header from '../header/header.jsx';
import IngredientInfo from '../ingredient-info/ingredient-info.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import styles from './app.module.css';

import { ingredientsData } from '../../utils/data.js';

const App = () => {

  const { ingredients, serverData, error, loading } = useIngredients();
  const { ingredientDetails, isOrderOpened, isModalOpened, close, open } = useModal();


  return (
    <>
      <Header />
      <main className={clsx(styles.main, 'pb-10')}>
        <div className={styles.main__container}>
          <BurgerIngredients
            ingredients={ingredients}
            openModal ={open}
          />

          <BurgerConstructor data ={ingredientsData}/>
        </div>
      </main>

      <Modal
        isModalOpened={isModalOpened}
        close={close}
        title={'Детали ингредиента'}
        >

        <IngredientInfo props={ingredientDetails}/>
      </Modal>
    </>,
    document.querySelector('#modal')
  );
}

export default App;
