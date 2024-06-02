import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import PersistLogin from "../utils/persistLogin";

const MainLayout = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <PersistLogin />
    </>
  );
};

export default MainLayout;
