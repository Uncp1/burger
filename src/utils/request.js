import { getCookie } from "./cookies";
import { updateCookie } from "./update-cookie";
import { serverConfig } from "./config";

export const request = (endpoint, options, token) => {
  return fetch(`${serverConfig.baseUrl}/${endpoint}`, {
    headers: {
      ...serverConfig.headers,
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

export const userDataRequest = async (endpoint, options) => {
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
