import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

type props = {
    greet: String,
    loading: Boolean
}

const App: React.FC<props> = ({greet, loading}) => {
console.log("loading => ", loading);
if (loading) return <div>loading...</div>;
console.log("greet => ", greet);
  return <div>{JSON.stringify(greet)}</div>;
};

export default App;
