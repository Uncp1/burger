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
    return res.ok
      ? json
      : Promise.reject(JSON.parse(JSON.stringify(res.json())));
  };

  const loginUser = (email, password) => {
    return request("auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };

  return { loginUser };
};
export const { loginUser } = userApi(
  serverConfig.baseUrl,
  serverConfig.headers
);
