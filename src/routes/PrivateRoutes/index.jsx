import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ClientContext } from "../../providers/ClientContext";
import { ContactProvider } from "../../providers/ContactContext";

export const PrivateRoutes = () => {
    const { client } = useContext(ClientContext);
    return client ? (
      <ContactProvider>
        <Outlet />
      </ContactProvider>
  ) : (
    <Navigate to="/" />
  );
};