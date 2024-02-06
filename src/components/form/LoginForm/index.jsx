import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { InputPassword } from "../../InputPassword";
import { Input } from "../../Input";
import { useContext, useState } from "react";
import { ClientContext } from "../../../providers/ClientContext";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const { clientLogin } = useContext(ClientContext);

  const submit = (formData) => {
    clientLogin(formData, setLoading, reset);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.formBox}>
      <h3 className="title three">Login</h3>
      <div>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email}
          disable={loading}
        />
        <InputPassword
          label="Senha"
          {...register("password")}
          error={errors.password}
          disable={loading}
        />
      </div>
      <div>
        <button className="btnFull pink" type="submit">
          {loading ? "acessando..." : "Acessar"}
        </button>
        <p className="title five">Ainda não possui uma conta?</p>
        <Link to="/register" className="btnFull grey" disable={loading}>
          Cadastre-se
        </Link>
      </div>
    </form>
  );
};
