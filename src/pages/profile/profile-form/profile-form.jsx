import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../services/hooks/useForm";
import { fetchUpdateUser } from "../../../services/slices/user-slice";

const ProfileForm = () => {
  const { handleChange } = useForm;
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password.length < 8) {
      dispatch(fetchUpdateUser({ name: user.name, email: user.email }));
    } else {
      dispatch(
        fetchUpdateUser({
          name: user.name,
          email: user.email,
          password: user.password,
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        type={"text"}
        placeholder={"Имя"}
        icon={"EditIcon"}
        value={user.name}
      />
      <EmailInput
        onChange={handleChange}
        icon={"EditIcon"}
        value={user.email}
      />
      <PasswordInput
        onChange={handleChange}
        icon={"EditIcon"}
        value={user.password}
      />

      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        extraClass={styles.button}
        disabled={
          !isButtonActive ||
          patchUserRequest.fetch ||
          !values.email ||
          values.name.length < 2
        }
      >
        {patchUserRequest.fetch ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
};
