import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { RegisterForm } from "../../components/form/RegisterForm";
import styles from "./style.module.scss";

export const RegisterPage = () => {
  return (
    <div className="container sm">
      <header className={styles.header}>
        <img src={Logo} alt="Logo ContactsApp" />
    
        <Link className={`btn md ${styles.button}`} to="/">
          Voltar
        </Link>
      </header>
      <main className={styles.main}>
        <div className={styles.div}>
          <h3 className="title three">Crie sua conta</h3>
          <p className="paragraph2">Rápido e grátis, vamos nessa!</p>
        </div>
        <RegisterForm />
      </main>
    </div>
  );
};
