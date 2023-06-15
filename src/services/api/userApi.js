import { getCookie, setCookie } from "../../utils/cookies";

const serverConfig = {
  baseUrl: `https://norma.nomoreparties.space/api`,
  headers: {
    authorization: "",
    "Content-Type": "application/json",
  },
};

const userApi = (baseUrl, headers) => {
  const request = async (endpoint, options = {}) => {
    const url = `${baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      headers: headers,
      ...options,
    });
    const json = await res.json();
    console.log(json);
    return res.ok
      ? json
      : Promise.reject(JSON.parse(JSON.stringify(res.json())));
  };

  const loginUser = ({ email, password }) => {
    return request("auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  const logoutUser = ({ token }) => {
    return request("auth/logout", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  };

  const registerUser = ({ email, password, name }) => {
    console.log(email, password, name);
    return request("auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  };

  const forgotPassword = ({ email }) => {
    return request("password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  const resetPassword = ({ password, token }) => {
    return request("password-reset/reset", {
      method: "POST",
      body: JSON.stringify({ password, token }),
    });
  };

  const patchUser = (data) => {
    return request("auth/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  };

  return {
    loginUser,
    registerUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    patchUser,
  };
};
export const {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  patchUser,
} = userApi(serverConfig.baseUrl, serverConfig.headers);
