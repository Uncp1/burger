import { useCallback } from "react";
import { getCookie } from "../../utils/cookies";
import { fetchLogout } from "../slices/user-slice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector((store) => store.user);

  const refreshToken = getCookie("refreshToken");
  const handleLogout = useCallback(() => {
    isUserLoggedIn &&
      refreshToken &&
      dispatch(fetchLogout({ token: refreshToken }));
  }, [dispatch, isUserLoggedIn, refreshToken]);

  return { handleLogout };
};
