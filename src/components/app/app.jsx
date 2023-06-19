import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
} from "../../pages";
import ModalNotification from "../modal-notification/modal-notification";
import ProtectedRoute from "../protected-route/protected-route";
import { getCookie } from "../../utils/cookies";
import { fetchGetUser } from "../../services/slices/user-slice";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import OrderInfo from "../order-info/order-info";
import { fetchIngredients } from "../../services/slices/ingredient-slice";
import { closeModal } from "../../services/slices/modal-slice";
import { useAuth } from "../../services/hooks/useAuth";

const App = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);
  const { modalOrder, modalIngredient } = useSelector((state) => state.modal);
  const { user, isUserLoggedIn, token } = useSelector((store) => store.user);
  const { isTokenExpired, previousUrl } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const background =
    modalIngredient || modalOrder ? location?.state?.background : null;

  useEffect(() => {
    if (ingredients && ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
    if (isTokenExpired || isUserLoggedIn) dispatch(fetchGetUser());
  }, [dispatch, isTokenExpired, isUserLoggedIn, ingredients]);

  const handleModalClose = useCallback(() => {
    dispatch(closeModal());
    (modalIngredient || modalOrder) &&
      navigate(previousUrl, {
        replace: true,
        state: { background: null },
      });
  }, [dispatch, modalIngredient, modalOrder, navigate, previousUrl]);
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutPage />}>
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirect="/login" anonymous={false}>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileForm />} />
            <Route path="/profile/orders" element={<NotFound404 />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientPage />} />

          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>

      <ModalNotification></ModalNotification>

      <Modal
        handleModalClose={handleModalClose}
        title={modalOrder ? "Идентификатор заказа" : "Детали ингредиента"}
      >
        {background && modalIngredient && (
          <IngredientInfo ingredient={modalIngredient} />
        )}

        {modalOrder && <OrderInfo />}
      </Modal>
    </>
  );
};

export default App;
