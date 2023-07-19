import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<
  PropsWithChildren<{ redirect: string; anonymous?: boolean }>
> = ({ children, redirect, anonymous }) => {
  if (document.cookie && anonymous) {
    return <Navigate to={redirect} />;
  }

  if (!document.cookie && !anonymous) {
    return <Navigate to={redirect} />;
  }

  return <> {children} </>;
};

export default ProtectedRoute;
