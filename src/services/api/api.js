import { getCookie } from "../../utils/tokens";

const serverConfig = {
  baseUrl: `https://norma.nomoreparties.space/api`,
  headers: {
    authorization: "",
    "Content-Type": "application/json",
  },
};

const Api = (baseUrl, headers) => {
  const request = async (endpoint, options = {}) => {
    const url = `${baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      headers: headers,
      ...options,
    });
    const json = await res.json();
    return res.ok
      ? json
      : Promise.reject(JSON.parse(JSON.stringify(res.json())));
  };

  const getIngredients = () => {
    return request("ingredients");
  };

  const createOrder = (order) => {
    return request("orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
  };

  /*
  const updateToken = () => {};
  const register = ({ email, password, name }) => {
    return request("auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  };

  const resetPassword = (email) => {
    return request("password-reset", {
      method: "POST",
      body: JSON.stringify(email),
    });
  }; */

  return { getIngredients, createOrder };
};

export const api = Api(serverConfig.baseUrl, serverConfig.headers);
