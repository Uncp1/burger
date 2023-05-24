import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  NotFound404,
  RegisterPage,
  ResetPage,
  LayoutPage,
} from "../../pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPage />} />
          <Route path="/profile" element={<HomePage />} />
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
