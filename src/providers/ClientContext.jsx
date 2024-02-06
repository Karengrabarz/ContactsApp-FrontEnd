import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import {api} from '../services/api.js'
import { toast } from "react-toastify";

export const ClientContext = createContext({});

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(null);

  const navigate = useNavigate();

  const [isOpenUpdateClientModal, setIsOpenUpdateClientModal] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const pathname = window.location.pathname;

  useEffect(() => {
    const loadClient = async () => {
      const token = localStorage.getItem("@token");
  

      if (token) {
        try {
          setLoading(true);
          const { data } = await api.get("/clients", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setClient(data);
          navigate(pathname);
        } catch (error) {
          localStorage.removeItem("@token");
        } finally {
          setLoading(false);
        }
      }
    };
    loadClient();
  }, []);

  const clientLogout = () => {
    setClient(null);
    navigate("/");
    localStorage.removeItem("@token");
    localStorage.removeItem("@clientId");
  };

  const clientUpdate = async (formData) =>{
    try{
      const token = localStorage.getItem("@token");
      const { data } = await api.patch(
        `/clients/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setClient(data)
      setIsOpenUpdateClientModal(false);
    }catch(error){
      if (error.response?.data.error === "Email already exists."){
        toast.error("Email já cadastrado");

      }
    }
  }
  const deleteClient = async () => {
    try {
      const token = localStorage.getItem("@token");

      await api.delete(`/clients/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Cliente deletado com sucesso.");
      setTimeout(() => {
        navigate("/");
        localStorage.removeItem('@token')
      }, 2000);
    } catch (error) {}
  };
  const clientLogin = async (formData, setLoading, reset) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", formData);
      toast.success("Login realizado com sucesso");
      const clientData = await api.get('/clients',{
        headers:{
          Authorization:`Bearer ${data.token}`
        }
      })
      setClient(clientData.data);
    

      localStorage.setItem("@token", data.token);
      reset();
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      toast.error("Email e/ou senha incorreta");
    
    } finally {
      setLoading(false);
    }
  };

  const clientRegister = async (formData, setLoading) => {

    try {
      setLoading(true);
      await api.post("/clients", formData);
      toast.success("Cadastro realizado com sucesso");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response?.data.message === "Email already exists")
      toast.error("Email já cadastrado");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ClientContext.Provider
      value={{ client, clientLogout, clientLogin, clientRegister, loading, clientUpdate,isOpenUpdateClientModal, setIsOpenUpdateClientModal, deleteClient }}
    >
      {children}
    </ClientContext.Provider>
  );
}
