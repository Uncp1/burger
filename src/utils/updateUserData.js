import { updateUser } from "../services/slices/user-slice";
import { getCookie, setCookie } from "./cookies";

export const updateCookie = ({ user, accessToken, refreshToken }) => {
  console.log(user);
  if (user !== null) {
    const expiresAt = Date.now + 1000000;
    setCookie("accessToken", accessToken, 2000);
    setCookie("refreshToken", refreshToken, 2000);
    setCookie("expiresAt", expiresAt, 2000);
    console.log(getCookie("accessToken"));
  } else {
    setCookie("accessToken", "", 1);
    setCookie("refreshToken", "", 1);
    setCookie("expiresAt", "", 1);
  }
};
