import { setCookie } from "./cookies";

export const updateCookie = ({ user, request, accessToken, refreshToken }) => {
  if (user !== null || request) {
    const expiresAt = Date.now() + 1000000;
    setCookie("accessToken", accessToken, { expires: 2000 });
    setCookie("refreshToken", refreshToken, { expires: 2000 });
    setCookie("expiresAt", expiresAt, { expires: 2000 });
  } else {
    setCookie("accessToken", "", { expires: 1 });
    setCookie("refreshToken", "", { expires: 1 });
    setCookie("expiresAt", "", { expires: 1 });
  }
};
