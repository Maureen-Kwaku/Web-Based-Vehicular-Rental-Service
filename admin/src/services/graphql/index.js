import React, { Fragment } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  from,
  HttpLink,
} from "@apollo/client";
import { BASE_URL } from "../cookie.config";
import { onError } from "@apollo/client/link/error";
import { useAuthProvider } from "../context";
import toast from "react-hot-toast";
import Auth from "../cookie.config";

const ClientApollo = ({ children }) => {
  const httpLink = new HttpLink({
    uri: BASE_URL,
  });

  const [{ signOut }] = useAuthProvider();
  const authLink = new ApolloLink((operation, forward) => {
    let authorization = null;
    let auth = Auth.getCipher();
    let customHeaders = {};
    if (auth) {
      authorization = JSON.parse(auth).token;
      customHeaders.authorization = authorization;
    }

    operation.setContext({
      headers: {
        ...customHeaders,
      },
    });
    return forward(operation);
  });

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors?.length > 0) {
      if (graphQLErrors[0].message === "AuthorizationExpired") {
        signOut();
        return toast.error("Oops... Your session expired");
      }
    }
    if (networkError) {
      return toast.error(networkError.message);
    }
  });

  let link = from([authLink, errorLink, httpLink]);

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
  return (
    <Fragment>
      <ApolloProvider client={client}> {children}</ApolloProvider>
    </Fragment>
  );
};

export default ClientApollo;
