import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ClientContext } from "../../providers/ClientContext";

export const PublicRoutes = () => {
    const { client } = useContext(ClientContext);
    return client? <Navigate to="/dashboard" /> :   <Outlet />
  };
  