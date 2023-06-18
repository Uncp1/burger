import { getCookie } from "../../utils/cookies";
import { updateCookie } from "../../utils/update-cookie";

const serverConfig = {
  baseUrl: `https://norma.nomoreparties.space/api`,
  headers: {
    authorization: "",
    "Content-Type": "application/json",
  },
};

const userApi = (baseUrl, headers) => {
  const request = (endpoint, options, token) => {
    const url = `${baseUrl}/${endpoint}`;
    return fetch(url, {
      headers: {
        ...headers,
        authorization: token || getCookie("accessToken"),
      },
      ...options,
    }).then((res) => {
      const json = res.json();
      return res.ok
        ? json
        : Promise.reject(JSON.parse(JSON.stringify(res.json())));
    });
  };

  const userDataRequest = async (endpoint, options) => {
    const tokenUrl = `auth/token`;
    const access = getCookie("accessToken");
    const token = getCookie("refreshToken");

    if (access) {
      return request(endpoint, options, access);
    }
    if (!access && token) {
      const res = request(tokenUrl, {
        method: "POST",
        body: JSON.stringify({ token }),
      });

      return res
        .then((res) => {
          const { accessToken, refreshToken } = res;
          updateCookie({
            request: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          return request(endpoint, options, getCookie("accessToken"));
        })
        .catch((res) => {
          console.log(res);
        });
    }
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

  const getUser = () => userDataRequest("auth/user");
  const patchUser = (data) => {
    console.log(data);
    return userDataRequest("auth/user", {
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
    getUser,
  };
};
export const {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  patchUser,
  getUser,
} = userApi(serverConfig.baseUrl, serverConfig.headers);
