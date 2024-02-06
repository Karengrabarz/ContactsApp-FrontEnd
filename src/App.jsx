import { RoutesMain } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.scss";
import { useContext } from "react";
import { Loading } from "./components/Loading";
import { ClientContext } from "./providers/ClientContext";



function App() {
  const { loading } = useContext(ClientContext);
  return (
    <>
      {loading ? <Loading/> : <RoutesMain />}
      <ToastContainer position="top-right" autoClose={1 * 1000} />
    </>
  );
}

export default App;
