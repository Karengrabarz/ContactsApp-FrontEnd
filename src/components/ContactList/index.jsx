import { useContext } from "react";
import styles from "./style.module.scss";
import button from "../../assets/Button Plus.svg";
import { ContactCard } from "./ContactCard";
import { CreateContactModal } from "../modal/contactModal/CreateContactModal";
import { ContactContext } from "../../providers/ContactContext";

export const ContactList = () => {
    const { isOpenCreateContactModal, setIsOpenCreateContactModal, contactList } =
      useContext(ContactContext);
  
    return (
      <div className={styles.flexBox}>
        <div>
          <h2 className="title two">Contatos</h2>
          <button onClick={() => setIsOpenCreateContactModal(true)}>
            <img src={button} alt="button add contact" />
          </button>
        </div>
        <ul className={styles.ulBox}>
          {contactList?.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </ul>
        {isOpenCreateContactModal && (
          <CreateContactModal setIsOpenCreateContactModal={setIsOpenCreateContactModal} />
        )}
      </div>
    );
  };