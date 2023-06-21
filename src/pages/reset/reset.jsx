import { useDispatch } from "react-redux";
import styles from "./reset.module.css";
import LoginForm from "../../components/login-form/login-form";
import LoginLinks from "../../components/login-links/login-links";
import { fetchResetPassword } from "../../services/slices/user-slice";
import { useForm } from "../../services/hooks/useForm";
import { useNavigate } from "react-router-dom";

const ResetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputValues, handleChange, errors, isValid } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchResetPassword({
        password: inputValues.password,
        token: inputValues.token,
      })
    );
    navigate("/login");
  };

  return (
    <main className={styles.main}>
      <LoginForm
        handleChange={handleChange}
        inputValues={inputValues}
        type={"reset"}
        errors={errors}
        isValid={isValid}
        handleSubmit={handleSubmit}
      />
      <LoginLinks type="reset" />
    </main>
  );
};

export default ResetPage;
