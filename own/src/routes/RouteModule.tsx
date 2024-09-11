import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/DesktopModel";
import SignInPage from "../pages/Authentication/SignInPage";

const RouteModule = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>x
          <Route path="/login" element={<SignInPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteModule;
