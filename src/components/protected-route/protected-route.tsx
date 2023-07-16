import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, redirect, anonymous }: any) => {
  if (document.cookie && anonymous) {
    return <Navigate to={redirect} />;
  }

  if (!document.cookie && !anonymous) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;
