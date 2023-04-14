import { useEffect, useState } from 'react';
import { api } from '../../api/api.js';

const useIngredients = () => {
  const [ingredients, setIngredients] = useState([
    {
      type: "bun",
      name: 'Булки',
      items: []
    },
    {
      type: "sauce",
      name: 'Соусы',
      items: []
    },
    {
      type: "main",
      name: 'Начинки',
      items: []
    }
  ]);

  const [serverData, setServerData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateIngredients = (data) => {
    const updatedComponents = [...ingredients];
    data.forEach(ingredient => {
      updatedComponents.forEach((component) =>
        (component.type === ingredient.type && !component.items.find(item => item._id === ingredient._id))
          ? component.items.push(ingredient)
          : null);
    });
    setIngredients(updatedComponents);
  }; 

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data } = await api.getIngredients();
        updateIngredients(data);
        setServerData(data);
        setLoading(false);
        //console.log(ingredients);
      } catch (e) {
        setError(e);
      }
    };
    void loadData();
  }, []);

  return { ingredients, serverData, error, loading };
}

export default useIngredients;