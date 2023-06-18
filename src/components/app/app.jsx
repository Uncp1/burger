import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

const App = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);
  const { modalOrder, modalIngredient } = useSelector((state) => state.modal);
  const { user, isUserLoggedIn, token } = useSelector((store) => store.user);

  const location = useLocation();
  const background =
    modalIngredient || modalOrder ? location?.state?.background : null;

  const isTokenExpired = useMemo(() => {
    if (token) {
      const expiresAt = getCookie("expiresAt");
      return Date.now() >= expiresAt;
    } else {
      return true;
    }
  }, [token]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (
      (!isUserLoggedIn && isTokenExpired) ||
      (isUserLoggedIn && (!user.name || !user.email))
    ) {
      dispatch(fetchGetUser());
    }
  }, [dispatch, isTokenExpired, user, ingredients, isUserLoggedIn]);
  console.log(background, location);
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

      <Modal title={modalOrder ? "Идентификатор заказа" : "Детали ингредиента"}>
        {background && modalIngredient && (
          <IngredientInfo ingredient={modalIngredient} />
        )}

        {modalOrder && <OrderInfo />}
      </Modal>
    </>
  );
};

export default App;
