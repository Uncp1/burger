import { Component, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../../services/hooks/useAuth";

const ProtectedRoute = ({ children, redirect, anonymous }) => {
  //const { isUserLoggedIn } = useAuth();
  const { isUserLoggedIn } = useSelector((store) => store.user);
  console.log(useSelector((store) => store.user));
  console.log(isUserLoggedIn);

  if (isUserLoggedIn && anonymous) {
    return <Navigate to={redirect} />;
  }

  if (!isUserLoggedIn && !anonymous) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;
