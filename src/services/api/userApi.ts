import { request, userDataRequest } from "../../utils/request";

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return request("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = ({ token }: { token: string }) => {
  return request("auth/logout", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
};

export const registerUser = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  return request("auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};

export const forgotPassword = ({ email }: { email: string }) => {
  return request("password-reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = ({
  password,
  token,
}: {
  token: string;
  password: string;
}) => {
  return request("password-reset/reset", {
    method: "POST",
    body: JSON.stringify({ password, token }),
  });
};

export const getUser = () => userDataRequest("auth/user");
export const patchUser = (data: {
  email: string;
  name: string;
  password?: string;
}) => {
  return userDataRequest("auth/user", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
