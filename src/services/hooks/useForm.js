import { useState, useCallback } from "react";

export const useForm = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const form = target.closest("form");
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(() => {
    setInputValues({});
    setErrors({});
    setIsValid(false);
  }, [setInputValues, setErrors, setIsValid]);

  return {
    inputValues,
    handleChange,
    errors,
    isValid,
    resetForm,
    setInputValues,
  };
};
