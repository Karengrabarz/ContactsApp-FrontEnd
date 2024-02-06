import { useForm } from "react-hook-form";
import btnClose from "../../../../assets/X.png";
import { useContext } from "react";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactContext } from "../../../../providers/ContactContext";
import { Input } from "../../../Input";
import { contactUpdateSchema } from "../contactSchema";

export const UpdateContactModal = ({contact}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onChange",
    resolver: zodResolver(contactUpdateSchema),
  });

  const { updateContact, setIsOpenUpdateContactModal } = useContext(ContactContext);

  const submit = (formData) => {
    updateContact(formData);

  };

  return (
    <div role="dialog">
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <div>
            <h3 className="title modal">Atualização de contato</h3>
            <button onClick={() =>setIsOpenUpdateContactModal(false)}>
              <img src={btnClose} alt="close modal" />
            </button>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div className={styles.containerInput}>
              <Input
                label="Nome"
                type="text"
                {...register("name",{required: false})}
                error={errors.title}
                defaultValue={contact.name}
                
              />
              <Input
                label="Email"
                type="text"
                {...register("email",{required: false})}
                error={errors.title}
                defaultValue={contact.email}
              />
              <Input
                label="Telefone"
                type="number"
                {...register("telefone",{required: false})}
                error={errors.title}
                defaultValue={contact.telefone}
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