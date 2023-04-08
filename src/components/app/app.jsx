
import useIngredients  from '../../utils/hooks/useIngredients.js';
import useModal from '../../utils/hooks/useModal.js';
import clsx from 'clsx';
import Header from '../header/header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import styles from './app.module.css';
import { useCart } from '../../utils/hooks/useCart.js';


const App = () => {

  const { ingredients  } = useIngredients();
  const { ingredientInfo, orderInfo, isModalOpened, close, open } = useModal();
  const { cart } = useCart();

  return (
    <>
      <Header />
      <main className={clsx(styles.main, 'pb-10')}>
        <div className={styles.main__container}>
          <BurgerIngredients
            ingredients={ingredients}
            openModal ={open}
          />

          <BurgerConstructor 
            openModal ={open}
            cart ={cart}
          />
        </div>
      </main>

      <Modal
        isModalOpened={isModalOpened}
        close={close}
        title={ingredientInfo ? 'Детали ингредиента' : ''}
        orderInfo={orderInfo}
        orderNumber={cart.orderNumber}
        ingredientInfo={ingredientInfo}
        />
    </>
  );
}

export default App;
