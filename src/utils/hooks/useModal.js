import { useEffect, useState } from 'react';

const useModal = () => {
  const [isModalOpened, setModalState] = useState(false);
  const [ingredientInfo, setIngredientInfo] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  const close = () => {
    if (orderInfo !== null) setOrderInfo(null);
    if (ingredientInfo !== null) setIngredientInfo(null);
    setModalState(false);
  };

  const open = (type, value) => {
    if (type === 'ingredient') {
      setIngredientInfo(value);
      setModalState(true);
    }
    if (type === 'cart') {
      setOrderInfo(value);
      setModalState(true);
    }
  };

  useEffect(() => {
    if (!isModalOpened) return;
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleEscape = (e) => (e.key === 'Escape') && close();

  return {
    handleEscape,
    close,
    open,
    isModalOpened,
    ingredientInfo,
    orderInfo,
  };
}

export default useModal;