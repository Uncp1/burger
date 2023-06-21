import { request, userDataRequest } from "../../utils/request";

export const loginUser = ({ email, password }) => {
  return request("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutUser = ({ token }) => {
  return request("auth/logout", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
};

export const registerUser = ({ email, password, name }) => {
  return request("auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};

export const forgotPassword = ({ email }) => {
  return request("password-reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = ({ password, token }) => {
  return request("password-reset/reset", {
    method: "POST",
    body: JSON.stringify({ password, token }),
  });
};

export const getUser = () => userDataRequest("auth/user");
export const patchUser = (data) => {
  return userDataRequest("auth/user", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
