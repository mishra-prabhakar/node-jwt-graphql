import "../styles/globals.css";
import type { AppProps } from "next/app";
import useApollo from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
