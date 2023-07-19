import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import { useAppSelector } from "./hooks";

export const useAuth = () => {
  const accessToken = useAppSelector((store) => store.login);

  const location = useLocation();
  const isTokenExpired = useMemo(() => {
    if (accessToken) {
      const expiresAt = getCookie("expiresAt");
      return Date.now() >= +expiresAt;
    } else {
      return true;
    }
  }, [accessToken]);

  const previousUrl = useMemo(
    () =>
      location.state && location.state.background
        ? location?.state?.background
        : null,
    [location]
  );

  return { previousUrl, isTokenExpired };
};
