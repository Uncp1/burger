import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFound404,
  RegisterPage,
  ResetPage,
  LayoutPage,
  ProfilePage,
  ForgotPasswordPage,
} from "../../pages";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
  return (
    <Router>
      <Routes>
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
          />
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
