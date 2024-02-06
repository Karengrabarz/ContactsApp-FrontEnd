import { useForm } from "react-hook-form";

import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";
import { InputPassword } from "../../InputPassword";
import { useContext, useState } from "react";
import { Input } from "../../Input";
import { ClientContext } from "../../../providers/ClientContext";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    // mode:'onChange',
    resolver: zodResolver(registerFormSchema),
  });
  const [loading, setLoading] = useState(false);

  const { clientRegister } = useContext(ClientContext);

  const submit = (formData) => {
    clientRegister(formData, setLoading)

};

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.formBox}>
      <Input
        disable={loading}
        label="Nome"
        type="text"
        {...register("name")}
        error={errors.name}
        placeholder="Digite aqui seu nome"
      />
      <Input
        disable={loading}
        label="Email"
        type="text"
        {...register("email")}
        error={errors.email}
        placeholder="Digite aqui seu email"
      />
      <InputPassword
        disable={loading}
        label="Senha"
        {...register("password")}
        error={errors.password}
        placeholder="Digite aqui sua senha"
      />
      <InputPassword
        disable={loading}
        label="Confirmar Senha"
        {...register("confirmPassword")}
        error={errors.confirmPassword}
        placeholder="Digite novamente sua senha"
      />
      <Input
        disable={loading}
        label="Telefone"
        type="number"
        {...register("telefone")}
        error={errors.telefone}
        placeholder="Opção de contato"
      />
      <button
        disable={!isValid || !isDirty}
        className="btnFull disable"
        type="submit"
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
};
