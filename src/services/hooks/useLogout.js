import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/cookies";
import { fetchLogout } from "../slices/user-slice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const { isUserLoggedIn } = useSelector((store) => store.user);

  const refreshToken = getCookie("refreshToken");
  const handleLogout = useCallback(() => {
    isUserLoggedIn &&
      refreshToken &&
      dispatch(fetchLogout({ token: refreshToken }));
  }, [dispatch, isLogin, refreshToken]);

  return { handleLogout };
};
