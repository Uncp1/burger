import { getCookie } from "../../utils/cookies";
import { useEffect, useState } from "react";

export const useAuth = () => {
  //const token = getCookie("accessToken")
  const [token, setToken] = useState(getCookie("accessToken"));
  useEffect(() => {});
  return token;
};
