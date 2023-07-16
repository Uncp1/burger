import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

const LayoutPage: FC = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default LayoutPage;
