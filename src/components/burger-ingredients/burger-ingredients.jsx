import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { InView } from "react-intersection-observer";

import IngredientItem from "../ingredient-item/ingredient-item";
import IngredientsList from "../ingredient-type/ingredients-list";

const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.ingredients);

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const main = ingredients.filter((item) => item.type === "main");

  const bunList = buns.map((item) => (
    <IngredientItem key={item._id} ingredient={item} />
  ));
  const sauceList = sauces.map((item) => (
    <IngredientItem key={item._id} ingredient={item} />
  ));
  const mainList = main.map((item) => (
    <IngredientItem key={item._id} ingredient={item} />
  ));

  const [currentTab, setCurrentTab] = useState("bun");
  const [tabList] = useState([
    {
      value: "Булки",
      type: "bun",
    },
    {
      value: "Соусы",
      type: "sauce",
    },
    {
      value: "Начинки",
      type: "main",
    },
  ]);

  const tabsRef = useRef(null);
  const setTabRef = () =>
    !tabsRef.current ? (tabsRef.current = {}) : tabsRef.current;

  const scrollItems = useCallback((index) => {
    const ref = setTabRef();
    ref.get(index).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }, []);

  const handleTabClick = useCallback(
    (value, index) => {
      setCurrentTab(value);
      scrollItems(index);
    },
    [scrollItems]
  );

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

export default BurgerIngredients;
/*

<ul className={styles.list}>
        <IngredientsList className={`${styles.sublist} pl-4 pr-4`} type={"buns"} title={"Булки"}>
          {bunList}
        </IngredientsList>

        <IngredientsList className={`${styles.sublist} pl-4 pr-4`} type={"sauce"} title={"Соусы"}>
          {sauceList}
        </IngredientsList>

        <IngredientsList className={`${styles.sublist} pl-4 pr-4`} type={"main"} title={"Начинки"}>
          {mainList}
        </IngredientsList>
      </ul>
*/
