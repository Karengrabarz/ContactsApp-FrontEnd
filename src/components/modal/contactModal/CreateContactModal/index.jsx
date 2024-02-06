import { useForm } from "react-hook-form";
import btnClose from "../../../../assets/X.png";
import { useContext } from "react";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactContext } from "../../../../providers/ContactContext";
import { Input } from "../../../Input";
import { contactCreateSchema } from "../contactSchema";


export const CreateContactModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onChange",
    resolver: zodResolver(contactCreateSchema),
  });

  const { createContact, setIsOpenCreateContactModal} = useContext(ContactContext);

  const submit = (formData) => {
    createContact(formData);

  };

  return (
    <div role="dialog">
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <div>
            <h3 className="title modal">Criar contato</h3>
            <button onClick={() => setIsOpenCreateContactModal(false)}>
              <img src={btnClose} alt="close modal" />
            </button>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles.containerInput}>
              <Input
                label="Nome"
                type="text"
                {...register("name")}
                error={errors.title}
           
                
              />
              <Input
                label="Email"
                type="text"
                {...register("email")}
                error={errors.title}

              />
              <Input
                label="Telefone"
                type="number"
                {...register("telefone")}
                error={errors.title}
      
              />
            </div>
        
            <button className="btnFull pink" type="submit">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
