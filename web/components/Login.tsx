import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const Login: React.FC = () => {
  const { data, loading } = useQuery(gql`
    query Welcome {
      welcome
    }
  `);

  if (loading) return <div>loading...</div>;
  return <div>Login!!</div>;
};

export default Login;
