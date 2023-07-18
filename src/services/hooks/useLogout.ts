import { useCallback } from "react";
import { getCookie } from "../../utils/cookies";
import { fetchLogout } from "../slices/login-slice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn } = useAppSelector((store) => store.user);

  const refreshToken = getCookie("refreshToken");
  const handleLogout = useCallback(() => {
    isUserLoggedIn && refreshToken && dispatch(fetchLogout({ dispatch }));
  }, [dispatch, isUserLoggedIn, refreshToken]);

  return { handleLogout };
};
