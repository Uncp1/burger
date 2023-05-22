import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage = () => {
  return (
    <section>
      <form>
        <EmailInput />
        <PasswordInput />

        <Button>Войти</Button>
      </form>
    </section>
  );
};

export default LoginPage;
