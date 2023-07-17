import { useState, useCallback, ChangeEvent } from "react";

interface IValues {
  name?: string;
  password?: string;
  email?: string;
  token?: string;
}

export const useForm = () => {
  const [inputValues, setInputValues] = useState<IValues>({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const form = target.closest("form");
    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    form && setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setInputValues(newValues);
      setErrors({});
      setIsValid(false);
    },
    [setInputValues, setErrors, setIsValid]
  );

  return {
    inputValues,
    handleChange,
    errors,
    isValid,
    resetForm,
    setInputValues,
  };
};
