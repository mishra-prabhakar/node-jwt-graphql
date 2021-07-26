import { useMemo } from "react";
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const accessToken = Cookies.get("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState: {}) => {
  // TODO: double check the type here
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

const useApollo = (initialState: {}) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

export default useApollo;
