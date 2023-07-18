import { getCookie } from "./cookies";
import { updateCookie } from "./update-cookie";
import { serverConfig } from "./config";

export const request = (
  endpoint: string,
  options?: RequestInit,
  token?: string
) => {
  return fetch(`${serverConfig.baseUrl}/${endpoint}`, {
    headers: {
      ...serverConfig.headers,
      authorization: token || (getCookie("accessToken") as string),
    },
    ...options,
  }).then((res) => {
    const json = res.json();
    return res.ok
      ? json
      : Promise.reject(JSON.parse(JSON.stringify(res.json())));
  });
};

export const userDataRequest = async (
  endpoint: string,
  options?: RequestInit
) => {
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

    
      
        const { accessToken, refreshToken } = res;
        updateCookie({
          request: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
        return request(endpoint, options, getCookie("accessToken"));
     
      .catch((res) => {
        console.log(res);
      });
  }
};
