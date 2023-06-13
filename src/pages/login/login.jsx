import { Link } from "react-router-dom";
import styles from "./login.module.css";
import LoginForm from "../../components/login-form/login-form";
import LoginLinks from "../../components/login-links/login-links";
import { useDispatch } from "react-redux";
import { fetchLogin, updateUser } from "../../services/slices/user-slice";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "../../services/hooks/useForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { inputValues, handleChange, errors, isValid, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        fetchLogin({
          email: inputValues.email,
          password: inputValues.password,
        })
      );
    },
    [inputValues.email, inputValues.password, dispatch]
  );

  return (
    <main className={styles.main}>
      <LoginForm
        type={"login"}
        errors={errors}
        inputValues={inputValues}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isValid={isValid}
      />
      <LoginLinks type={"login"} />
    </main>
  );
};

export default LoginPage;
