
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import styles from './app.module.css';

import { ingredientsData } from '../../utils/data.js';

const App = () => {
  console.log(ingredientsData);
  /*
  const [components, setComponents] = useState([
    {
      name: 'Булки',
      type: 'bun',
      items: []
    },
    {
      name: 'Соусы',
      type: 'sauce',
      items: []
    },
    {
      name: 'Начинки',
      type: 'main',
      items: []
    }
  ]);

  useEffect(() => createComponentsArray(ingredientsData), [ingredientsData]);


  function createComponentsArray(data) {
    const updatedComponents = [...components];
    data.forEach(ingredient => {
      updatedComponents.forEach((component, index) =>
        (!updatedComponents[index].items.includes(ingredient)
          && component.type === ingredient.type)
          ? updatedComponents[index].items.push(ingredient)
          : null
      );
    });
    setComponents(updatedComponents);
  }; */

  return (
    <>
      <Header />
      <main className={clsx(styles.main, 'pb-10')}>
        <div className={styles.main__container}>
          <BurgerIngredients data ={ingredientsData}/>
          <BurgerConstructor data ={ingredientsData}/>
        </div>
      </main>
    </>
  );
}

export default App;
