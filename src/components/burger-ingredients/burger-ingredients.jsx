import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { InView } from "react-intersection-observer";

import IngredientItem from "../ingredient-item/ingredient-item";
import IngredientsType from "../ingredient-type/ingredients-type";

const BurgerIngredients = () => {
  const { ingredients } = useSelector((state) => state.ingredients);
  console.log(ingredients);

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
  const getRefs = () =>
    !tabsRef.current ? (tabsRef.current = new Map()) : tabsRef.current;

  const scrollToId = useCallback((itemKey) => {
    const refs = getRefs().get(itemKey);
    refs.scrollIntoView();
  }, []);

  const handleTabClick = useCallback(
    (value, index) => {
      setCurrentTab(value);
      scrollToId(index);
    },
    [scrollToId]
  );

  return (
    <section>
      <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {tabList.map((tab, index) => (
          <li key={tab.type}>
            <Tab
              value={tab.value}
              active={currentTab === tab.type}
              onClick={(currentTab) => handleTabClick(currentTab, index)}
            >
              {tab.value}
            </Tab>
          </li>
        ))}
      </ul>

      <ul className={styles.list}>
        {tabList.map((tab, index) => (
          <InView
            as="li"
            key={index}
            className={styles.ingredients__column}
            data-type={tab.type}
            onChange={(inView, entry) => {
              const refs = getRefs();
              refs.set(index, entry.target);
              if (inView) {
                setCurrentTab(entry.target.dataset.type);
              }
            }}
          >
            <IngredientsType
              className="pl-4 pr-4"
              type={tab.type}
              name={tab.value}
            >
              {tab.type === "bun"
                ? bunList
                : tab.type === "sauce"
                ? sauceList
                : mainList}
            </IngredientsType>
          </InView>
        ))}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
