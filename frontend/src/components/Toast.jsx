import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (err, success) => {
  if (err) {
    toast.error(err, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  } else if (success) {
    toast.success(success, {
      position: "bottom-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  }
};
