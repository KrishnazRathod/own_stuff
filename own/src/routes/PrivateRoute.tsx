import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../redux/NotesSlice";

const PrivateRoute = () => {
  const userCredentidal = useSelector(getUserToken);
  console.log("userCredentidal:", userCredentidal);
  const auth = {
    token: userCredentidal,
  };
  return <>{auth.token ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
