import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAuth({
        accessToken: response.data.accessToken,
        name: response.data?.name,
      });
      return response.data.accessToken;
    } catch (err) {
      console.log(err);
      if (err.response?.status === 403) {
        navigate("/login");
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
