import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

export const useAuth = () => {
  const { token } = useSelector((store) => store.user);

  const location = useLocation();
  const isTokenExpired = useMemo(() => {
    if (token) {
      const expiresAt = getCookie("expiresAt");
      return Date.now() >= expiresAt;
    } else {
      return true;
    }
  }, [token]);

  const previousUrl = useMemo(
    () =>
      location.state && location.state.background
        ? location?.state?.background
        : null,
    [location]
  );

  return { previousUrl, isTokenExpired };
};
