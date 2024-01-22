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
        <Route path="/" element={<LayoutPage />}>
          <Route index path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset"
            element={
              <ProtectedRoute redirect="/" anonymous={true}>
                <ResetPage />
              </ProtectedRoute>
            }
          />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<OrderPage />} />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute redirect="/login">
                <OrderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirect="/login" anonymous={false}>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path="/profile/orders" element={<ProfileOrders />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage />} />

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
