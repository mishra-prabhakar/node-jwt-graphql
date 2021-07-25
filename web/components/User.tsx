import React, { ReactElement, useEffect } from "react";
import styles from "../styles/User.module.css";
import { useCookies } from "react-cookie";
import { NextRouter, useRouter } from "next/router";

const toLogin = (router: NextRouter) => {
  router.replace("/login");
};

const User = () => {
  const router = useRouter();
  const [cookies, removeCookie] = useCookies(["accesToken"]);

  useEffect(() => {
    if (!cookies.accessToken) toLogin(router);
  });

  const handleClick = () => {
    removeCookie("accessToken", "", { path: "/" });
    router.replace("/login");
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.welcomeMessage}`}>
        <h1>Welcome FullName!</h1>
        <h2>
          To logout click{" "}
          <a className={styles.anchorButton} onClick={handleClick}>
            here
          </a>
        </h2>
      </div>
    </div>
  );
};

export default User;
