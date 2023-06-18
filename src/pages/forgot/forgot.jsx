import styles from "./forgot.module.css";
import LoginForm from "../../components/login-form/login-form";
import LoginLinks from "../../components/login-links/login-links";
import { useDispatch, useSelector } from "react-redux";
import { fetchForgotPassword } from "../../services/slices/user-slice";
import { useCallback, useEffect } from "react";
import { useForm } from "../../services/hooks/useForm";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { inputValues, handleChange, errors, isValid, resetForm } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        fetchForgotPassword({
          email: inputValues.email,
        })
      );
      navigate("/reset");
    },
    [inputValues.email, dispatch, navigate]
  );

  return (
    <main className={styles.main}>
      <LoginForm
        type={"forgot"}
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

export default ForgotPasswordPage;
