import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/hooks/hooks";
import { useForm } from "../../../services/hooks/useForm";
import { fetchUpdateUser } from "../../../services/slices/user-sclice";
import styles from "./profile-form.module.css";

const ProfileForm: FC = () => {
  const [isEdited, setEdit] = useState({
    name: false,
    email: false,
    password: false,
  });
  const { inputValues, handleChange, resetForm, isValid } = useForm();
  const { user, request } = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      inputValues.password &&
      typeof inputValues.password.length === "number" &&
      inputValues.password.length < 8
    ) {
      dispatch(
        fetchUpdateUser({ name: inputValues.name, email: inputValues.email })
      );
    } else {
      dispatch(
        fetchUpdateUser({
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password,
        })
      );
    }
  };

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    user && resetForm({ name: user.name, email: user.email, password: "" });
  }, [resetForm, user]); //обновляет данные при переходе

  const onIconNameClick = () => {
    setEdit({ ...isEdited, name: !isEdited.name });
    setTimeout(() => inputNameRef.current?.focus(), 0);
  };

  const onIconEmailClick = () => {
    setEdit({ ...isEdited, email: !isEdited.email });
    setTimeout(() => {
      inputEmailRef.current?.focus();
    }, 0);
  };

  const onIconPasswordClick = () => {
    setEdit({ ...isEdited, password: !isEdited.password });
    setTimeout(() => {
      inputPasswordRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setEdit({ name: false, email: false, password: false });
  };

  const checkForEdit = !!(
    user !== null &&
    (user.name !== inputValues.name ||
      user.email !== inputValues.email ||
      inputValues.password)
  );

  const isSubmitActive = useCallback(
    () => isValid && checkForEdit,
    [isValid, checkForEdit]
  );
  const handleResetValue = useCallback(() => {
    user && resetForm({ name: user.name, email: user.email, password: "" });
  }, [resetForm, user]);

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          onChange={handleChange}
          name="name"
          type={"text"}
          placeholder={"Имя"}
          icon={"EditIcon"}
          value={inputValues.name || ""}
          onIconClick={onIconNameClick}
          disabled={!isEdited.name}
          ref={inputNameRef}
          onBlur={() => handleBlur()}
        />
        <Input
          //По какой-то причине EmailInput и PasswordInput не дружат с ref
          onChange={handleChange}
          name="email"
          icon={"EditIcon"}
          placeholder={"Почта"}
          value={inputValues.email || ""}
          onIconClick={onIconEmailClick}
          disabled={!isEdited.email}
          ref={inputEmailRef}
          onBlur={() => handleBlur()}
        />
        <Input
          name="password"
          placeholder={"Пароль"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={inputValues.password || ""}
          onIconClick={onIconPasswordClick}
          disabled={!isEdited.password}
          ref={inputPasswordRef}
          onBlur={() => handleBlur()}
        />

        {checkForEdit && (
          <div className={styles.handlers}>
            <Button
              htmlType="button"
              type="secondary"
              size="large"
              extraClass={styles.button_reset}
              onClick={() => handleResetValue()}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass={styles.button}
              disabled={!isSubmitActive}
            >
              {request.fetch ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default ProfileForm;
