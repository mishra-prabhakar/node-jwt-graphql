import React, { ReactElement, useEffect } from "react";
import styles from "../styles/User.module.css";
import { NextRouter, useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import Cookies from "js-cookie";

const toLogin = (router: NextRouter) => {
  router.replace("/login");
};

const User = () => {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");
console.log(`Cookies ---- ${accessToken}`);
  const { data, loading, error } = useQuery(gql`
    query User {
      User {
        firstName
        lastName
        email
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const { User } = data;
      if (!User.email) toLogin(router);
    }

    if (!accessToken) toLogin(router);
  });

  if (loading) return <div>loading...</div>;

  const handleClick = () => {
    Cookies.remove("accessToken", { path: "/" });
    router.replace("/login");
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.welcomeMessage}`}>
        {error ? (
          <div>User not found</div>
        ) : (
          <>
            <h1>
              Welcome {data?.User.firstName} {data?.User.lastName}!
            </h1>
            <h2>
              To logout click{" "}
              <a className={styles.anchorButton} onClick={handleClick}>
                here
              </a>
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
