import { FC, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  NotFound404,
  RegisterPage,
  ResetPage,
  LayoutPage,
  ProfilePage,
  ForgotPasswordPage,
  IngredientPage,
  ProfileForm,
  ProfileOrders,
  FeedPage,
  OrderPage,
} from '../../pages';
import ModalNotification from '../modal-notification/modal-notification';
import ProtectedRoute from '../protected-route/protected-route';
import { fetchGetUser } from '../../services/slices/user-sclice';
import Modal from '../modal/modal';
import IngredientInfo from '../ingredient-info/ingredient-info';
import OrderInfo from '../order-info/order-info';
import { fetchIngredients } from '../../services/slices/ingredient-slice';
import { closeModal } from '../../services/slices/modal-slice';
import { useAuth } from '../../services/hooks/useAuth';
import OrderDetails from '../order-details/order-details';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { PATH } from '../../utils/config';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { modalOrder, modalIngredient, modalOrderDetails } = useAppSelector(
    (state) => state.modal
  );
  const { previousUrl } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const background =
    modalIngredient || modalOrderDetails ? location?.state?.background : null;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetUser());
  }, [dispatch]);

  const handleModalClose = useCallback(() => {
    dispatch(closeModal());
    (modalIngredient || modalOrderDetails) &&
      navigate(previousUrl, {
        replace: true,
        state: { background: null },
      });
  }, [dispatch, modalIngredient, modalOrderDetails, navigate, previousUrl]);
  return (
    <>
      <Routes location={background || location}>
        <Route path={PATH.HOME} element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route
            path={PATH.LOGIN}
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATH.REGISTER}
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATH.FORGOT_PASSWORD}
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATH.RESET_PASSWORD}
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <ResetPage />
              </ProtectedRoute>
            }
          />
          <Route path={PATH.FEED} element={<FeedPage />} />
          <Route path={PATH.FEED_ORDER} element={<OrderPage />} />
          <Route
            path={PATH.ORDER}
            element={
              <ProtectedRoute redirect="/login">
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={PATH.PROFILE}
            element={
              <ProtectedRoute redirect="/login" anonymous={false}>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path={PATH.ORDERS} element={<ProfileOrders />} />
          </Route>
          <Route path={PATH.INGREDIENT} element={<IngredientPage />} />

          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>

      <ModalNotification></ModalNotification>

      <Modal
        handleModalClose={handleModalClose}
        title={modalOrderDetails ? 'Детали заказа' : 'Детали ингредиента'}
      >
        {background && modalIngredient && (
          <IngredientInfo ingredient={modalIngredient} />
        )}

        {background && modalOrderDetails && (
          <OrderDetails order={modalOrderDetails} />
        )}

        {modalOrder && <OrderInfo />}
      </Modal>
    </>
  );
};

export default App;
