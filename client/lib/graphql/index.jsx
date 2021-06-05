import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import Auth, { BASE_URL } from "../auth";
import { onError } from "@apollo/client/link/error";

export default function createApolloClient(initialState, ctx) {
  const httpLink = new HttpLink({
    uri: BASE_URL,
  });

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
      if (graphQLErrors[0].message === "AuthenticationFailed") {
        //log the user out.
        // signOut();
      }
    }

    if (networkError) {
      return console.log("Oops, something went wrong", {
        description: networkError.message,
      });
    }
  });

  let link = from([authLink, errorLink, httpLink]);

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            stores: {
              keyArgs: false,

              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }).restore(initialState),
  });
}
