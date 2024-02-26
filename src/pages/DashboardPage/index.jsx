import styles from "./style.module.scss";
import Logo from "../../assets/logo.png";
import { useContext } from "react";
import { ClientContext } from "../../providers/ClientContext";
import { MdOutlineDelete } from "react-icons/md";
import {ContactList} from '../../components/ContactList'
import { FaRegEdit } from "react-icons/fa";
import { UpdateClientModal } from "../../components/modal/clientModal";

export const DashboardPage = () => {
  const { client, clientLogout, setIsOpenUpdateClientModal, isOpenUpdateClientModal, deleteClient} = useContext(ClientContext);

  return (
    <div>
      <header className={styles.header}>
        <div className="container">
          <img src={Logo} alt="Logo ContactsApp" />
          <button className="btn sm" onClick={() => clientLogout()}>
            Sair
          </button>

        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.teste}>
          <div className={`container ${styles.flexBox}`}>
            <h1 className="title one">Olá, {client.name}</h1>
            <div className={styles.buttons}>
                <FaRegEdit color="#868E96"  size={22} alt='button update client'onClick={()=>setIsOpenUpdateClientModal(true) }/>
                <MdOutlineDelete color="#868E96"  size={22} onClick={()=>deleteClient() } />
            </div>
          </div>
        </div>
        <div className="container">
            <ContactList/>
        </div>
      </main>
      {isOpenUpdateClientModal && (
        <UpdateClientModal setIsOpenUpdateClientModal={setIsOpenUpdateClientModal} />
      )}
    </div>
  );
};
