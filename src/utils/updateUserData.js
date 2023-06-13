import { useDispatch } from "react-redux";
import { updateUser } from "../services/slices/user-slice";
import { setCookie } from "./cookies";

export const updateUserData = (user, accessToken, refreshToken, dispatch) => {
  //const dispatch = useDispatch();
  if (user === null) {
    //dispatch
  }
  if ((accessToken, refreshToken, user)) {
    const expiresAt = Date.now + 1000000;
    setCookie("accessToken", accessToken, 2000);
    setCookie("refreshToken", refreshToken, 2000);
    setCookie("expiresAt", expiresAt, 2000);
    dispatch(
      updateUser({
        token: { refreshToken, accessToken, expiresAt },
        user: user,
      })
    );
    console.log(user);
  } else {
    setCookie("accessToken", "", 1);
    setCookie("refreshToken", "", 1);
    setCookie("expiresAt", "", 1);
  }
};
