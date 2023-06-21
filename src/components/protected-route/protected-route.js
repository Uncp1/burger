import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirect, anonymous }) => {
  const { isUserLoggedIn } = useSelector((store) => store.user);

  if (isUserLoggedIn && anonymous) {
    return <Navigate to={redirect} />;
  }

  if (!isUserLoggedIn && !anonymous) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;
