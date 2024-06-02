import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
