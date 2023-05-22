import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage } from "../../pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<HomePage />} />
        <Route path="/forgot-password" element={<HomePage />} />
        <Route path="/reset-password" element={<HomePage />} />
        <Route path="/profile" element={<HomePage />} />
        <Route path="/404" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
