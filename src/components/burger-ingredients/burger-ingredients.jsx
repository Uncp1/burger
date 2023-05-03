import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import IngredientItem from "../ingredient-item/ingredient-item";
import IngredientsList from "../ingredient-type/ingredients-list";

const BurgerIngredients = ({ openModal }) => {
  const { ingredients } = useSelector((state) => state.ingredients);

  console.log(ingredients);

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const main = ingredients.filter((item) => item.type === "main");

  const bunList = buns.map((item) => (
    <IngredientItem key={item._id} ingredient={item} openModal={openModal} />
  ));
  const sauceList = sauces.map((item) => (
    <IngredientItem key={item._id} ingredient={item} openModal={openModal} />
  ));
  const mainList = main.map((item) => (
    <IngredientItem key={item._id} ingredient={item} openModal={openModal} />
  ));

  const [currentTab, setCurrentTab] = useState("Булки");

  function changeActiveTab(string) {
    setCurrentTab(string);
  }

  const [tabList] = useState([
    {
      value: "Булки",
      click: () => changeActiveTab("Булки"),
    },
    {
      value: "Соусы",
      click: () => changeActiveTab("Соусы"),
    },
    {
      value: "Начинки",
      click: () => changeActiveTab("Начинки"),
    },
  ]);

  return (
    <section>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {tabList.map((tab) => (
          <li key={tab.value}>
            <Tab
              value={tab.value}
              active={currentTab === tab.value}
              onClick={tab.click}
            >
              {tab.value}
            </Tab>
          </li>
        ))}
      </ul>

      <div className={styles.list}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.sublist} pl-4 pr-4`}>{bunList}</ul>

        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.sublist} pl-4 pr-4`}>{sauceList}</ul>

        <h2 className="text text_type_main-medium">Начинка</h2>
        <ul className={`${styles.sublist} pl-4 pr-4`}>{mainList}</ul>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
/*

<ul>
        <IngredientsList type={"buns"} title={"Булки"}>
          {bunList}
        </IngredientsList>

        <IngredientsList type={"sauce"} title={"Соусы"}>
          {sauceList}
        </IngredientsList>

        <IngredientsList type={"main"} title={"Начинки"}>
          {mainList}
        </IngredientsList>
      </ul>
*/
