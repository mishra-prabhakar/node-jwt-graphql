import User from "../components/User";
import styles from "../styles/Home.module.css";
import { useRouter } from 'next/router'

const UserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <User />
      </div>
    </div>
  );
};

export default UserPage;
