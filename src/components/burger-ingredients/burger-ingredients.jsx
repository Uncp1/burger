import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import { useState } from 'react';
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

import IngredientItem from '../ingredient-item/ingredient-item';

const BurgerIngredients = (props) => {

  const [ingredientList] = useState([
    {
      type: "bun",
      name: 'Булки'
    },
    {
      type: "sauce",
      name: 'Соусы'
    },
    {
      type: "main",
      name: 'Начинки'
    }
  ])
 
  const [currentTab, setCurrentTab] = useState('Булки');

  function changeActiveTab(string) {
    setCurrentTab(string);
  }

  const [tabList] = useState([
    {
      value: 'Булки',
      click: () => changeActiveTab('Булки')
    },
    {
      value: 'Соусы',
      click: () => changeActiveTab('Соусы')
    },
    {
      value: 'Начинки',
      click: () => changeActiveTab('Начинки')
    }
  ]);

  props.data.filter((item) => item.type === 'bun').map(component => console.log(component));


  return (
    <section>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {
          tabList.map(tab => (
            <li key={tab.value}>
              <Tab
                value={tab.value}
                active={currentTab === tab.value}
                onClick={tab.click}
              >
                {tab.value}
              </Tab>
            </li>
          ))
        }
      </ul>
      <div className={styles.list}>
        {
          ingredientList.map((ingr)  => (
            <ul key={ingr.type}>
              <h2 className="text text_type_main-medium">{ingr.name}</h2>

              <li className={`${styles.sublist} pl-4 pr-4`}>
                {
                  props.data.filter((item) => item.type === ingr.type).map(item => (
                    <IngredientItem ingredient={item} key={item._id}/>
                  ))
                }
              </li>
            
            </ul>
           ))
        } 
    </div>    
    </section> 
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;