import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { DashboardPage } from "../pages/DashboardPage";

export const RoutesMain = () => {
  
  
  return (
    <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />      
      </Route>
      <Route element={<PrivateRoutes/>}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};