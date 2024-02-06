import { useContext} from "react";
import { MdOutlineDelete} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import styles from "./style.module.scss";
import { ContactContext } from "../../../providers/ContactContext";
import { UpdateContactModal } from "../../modal/contactModal/UpdateContactModal";

export const ContactCard = ({ contact }) => {
  const {
    updateContactState,
    setUpdateContactState,
    isOpenUpdateContactModal,
    setIsOpenUpdateContactModal,
    deleteContact,
  } = useContext(ContactContext);

  return (
    <>
      <li className={styles.flexBox}>
        <h3 className="title three">{contact.name}</h3>
        <div>
          <p className="title four">{contact.email}</p>
          <p className="title four">{contact.telefone}</p>

          <div>
            <button
              onClick={() => {
                setIsOpenUpdateContactModal(true);
                setUpdateContactState(contact);

              }}
              title="update"
              aria-label="update"
            >
              <FaRegEdit color="#868E96" size={19} />
            </button>
            <button
              onClick={() => {
                deleteContact(contact.id);
              }}
              title="Remover"
              aria-label="remove"
            >
              <MdOutlineDelete color="#868E96" size={19} />
            </button>
          </div>
        </div>
      </li>
        {isOpenUpdateContactModal && updateContactState?.id === contact.id && (
          <UpdateContactModal
            contact={contact}
            setUpdateContactState={setUpdateContactState}
            updateContactState={updateContactState}
            setIsOpenUpdateContactModal={setIsOpenUpdateContactModal}
          />
        )}
      </>
  );
};
