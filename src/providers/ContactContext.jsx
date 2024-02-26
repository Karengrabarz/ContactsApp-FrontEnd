import { createContext, useContext, useEffect, useState } from "react";
import { ClientContext } from "./ClientContext";
import { toast } from "react-toastify";
import { api } from "../services/api";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const { client } = useContext(ClientContext);

  const [isOpenCreateContactModal, setIsOpenCreateContactModal] = useState(false);

  const [isOpenUpdateContactModal, setIsOpenUpdateContactModal] = useState(false);

  const [contactList, setContactList] = useState([]);

  const [updateContactState, setUpdateContactState] = useState({});

  useEffect(() => {
    const getContacts = () => {
      if (client.contacts.length > 0) {
        client.contacts.sort((a,b)=>{
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        setContactList(client.contacts);
      }
    };
    getContacts();
  }, []);

  const createContact = async (formData) => {
    try {
      const token = localStorage.getItem("@token");
      const { data } = await api.post("/contacts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsOpenCreateContactModal(false);
      setContactList([...contactList, data]);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };


  const deleteContact = async (deletingId) => {
    try {
      const token = localStorage.getItem("@token");

      await api.delete(`/contacts/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newContactList = contactList.filter((contact) => contact.id !== deletingId);
      setContactList(newContactList);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const updateContact = async (formData) => {

    try {
      const token = localStorage.getItem("@token");
      const { data } = await api.patch(
        `/contacts/${updateContactState.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newContactlist = contactList.map((contact) => {
        if (contact.id === updateContactState.id) {
          return data;
        } else {
          return contact;
        }
      });

      setContactList(newContactlist);
      setUpdateContactState(null);
      setIsOpenUpdateModal(false);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contactList,
        createContact,
        setIsOpenCreateContactModal,
        isOpenCreateContactModal,
        isOpenUpdateContactModal,
        setIsOpenUpdateContactModal,
        updateContact,
        deleteContact,
        setUpdateContactState,
        updateContactState,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
