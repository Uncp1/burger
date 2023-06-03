import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((store) => store.user);
};
