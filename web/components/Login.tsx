import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type OverlayProps = {
    handleSignInClick: () => void;
    handleSignUpClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ handleSignInClick, handleSignUpClick }) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
        <h1>Welcome!</h1>
        <p>
          To keep connected with us please login with your personal info by
          clicking below
        </p>
        <button
          type="submit"
          className={`${styles.button} ${styles.ghost}`}
          onClick={handleSignInClick}
        >
          Sign In
        </button>
      </div>
      <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
        <h1>Hello!</h1>
        <p>
          Enter your personal details and start journey with us by clicking
          below
        </p>
        <button
          className={`${styles.button} ${styles.ghost}`}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [containerActive, setContainerActive] = useState("left");

  const handleSignInClick = () => setContainerActive("left");

  const handleSignUpClick = () => setContainerActive("right");

  return (
    <div
      className={`${styles.container} ${
        containerActive == "right" ? styles.rightPanelActive : ""
      }`}
    >
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        {containerActive == "left" ? <SignInForm /> : null}
      </div>
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        {containerActive == "right" ? <SignUpForm /> : null}
      </div>
      <div className={styles.overlayContainer}>
        <Overlay
          handleSignInClick={handleSignInClick}
          handleSignUpClick={handleSignUpClick}
        />
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  return <LoginForm />;
};

export default Login;
