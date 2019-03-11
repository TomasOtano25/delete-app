import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject
} from "apollo-boost";
import fetch from "isomorphic-unfetch";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const isBrowser = typeof window !== undefined;

if (!isBrowser) {
  // @ts-ignore
  global.fetch = fetch;
}

function create(initialState?: any) {
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: new HttpLink({
      uri:
        process.env.NODE_ENV === "production"
          ? ""
          : "http://localhost:4000/graphql",
      credentials: "same-origin"
    }),

    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState?: any) {
  if (!isBrowser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
