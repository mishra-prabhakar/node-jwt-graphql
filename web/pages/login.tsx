import Login from "../components/Login";
import styles from "../styles/Home.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
