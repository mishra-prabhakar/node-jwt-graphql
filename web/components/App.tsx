import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
    query Welcome {
      welcome
    }
  `);

  if (loading) return <div>loading...</div>;
  return <div>{JSON.stringify(data.welcome)}</div>;
};

export default App;
