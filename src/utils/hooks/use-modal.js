import { useEffect, useState } from 'react';

const useModal = () => {
  const [isModalOpened, setModalState] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [isOrderOpened, setOrderOpened] = useState(false);

  const close = () => {
    if (isOrderOpened) setOrderOpened(false);
    if (ingredientDetails !== null) setIngredientDetails(null);
    setModalState(false);
  };

  const open = (type, value) => {
    if (type === 'ingredient') {
      setIngredientDetails(value);
      setModalState(true);
    }
    if (type === 'cart') {
      setOrderOpened(value);
      setModalState(true);
    }
  };

  useEffect(() => {
    if (!isModalOpened) return;
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpened]);

  const handleEscape = (e) => (e.key === 'Escape') && close();

  return {
    handleEscape,
    close,
    open,
    isModalOpened,
    ingredientDetails,
    isOrderOpened,
  };
}

export default useModal;