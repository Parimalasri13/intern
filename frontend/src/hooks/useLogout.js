import useAxiosPrivate from "./useAxiosprivate";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({});
    try {
      await axiosPrivate("/logout");
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
