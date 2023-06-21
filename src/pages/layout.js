import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayoutPage;
