import { useCallback, useEffect, useState } from "react";
import styles from "./register.module.css";
import LoginForm from "../../components/login-form/login-form";
import LoginLinks from "../../components/login-links/login-links";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../services/slices/user-slice";
import { useForm } from "../../services/hooks/useForm";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { inputValues, handleChange, errors, isValid, resetForm } = useForm();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(inputValues);
      dispatch(
        fetchRegister({
          email: inputValues.email,
          password: inputValues.password,
          name: inputValues.name,
        })
      );
    },
    [dispatch, inputValues.email, inputValues.password, inputValues.name]
  );

  return (
    <main className={styles.container}>
      <LoginForm
        type="register"
        errors={errors}
        isValid={isValid}
        inputValues={inputValues}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <LoginLinks type="register" />
    </main>
  );
};

export default RegisterPage;
