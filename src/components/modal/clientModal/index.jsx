import { useForm } from "react-hook-form";
import btnClose from '../../../assets/X.png'
import { useContext } from "react";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientUpdateSchema } from "./UpdateClientModalSchema";
import { ClientContext } from "../../../providers/ClientContext";
import { Input } from "../../Input";
import { InputPassword } from "../../InputPassword";

export const UpdateClientModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onChange",
    resolver: zodResolver(clientUpdateSchema),
  });

  const { clientUpdate,client, setIsOpenUpdateClientModal } = useContext(ClientContext);

  const submit = (formData) => {
    clientUpdate(formData);

  };

  return (
    <div role="dialog">
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <div>
            <h3 className="title modal">Editar dados</h3>
            <button onClick={() => setIsOpenUpdateClientModal(false)}>
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
                defaultValue={client.name}
                
              />
              <Input
                label="Email"
                type="text"
                {...register("email",{required: false})}
                error={errors.title}
                defaultValue={client.email}
              />
              <InputPassword
                label="Password"
                type="text"
                {...register("password",{required: false})}
                error={errors.title}
                defaultValue={client.password}
              />
              <Input
                label="Telefone"
                type="number"
                {...register("telefone",{required: false})}
                error={errors.title}
                defaultValue={client.telefone}
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
