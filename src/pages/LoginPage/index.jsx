import { LoginForm } from "../../components/form/LoginForm";
import styles from "./style.module.scss";
import Logo from '../../assets/logo.png'
export const LoginPage = () => {
    return (
      <div className="container">
        <header className={styles.header}>
          <img className={styles.img} src={Logo} alt="Logo contacts" />
        </header>
        <main className={styles.main}>
          <LoginForm />
        </main>
      </div>
    );
  };