import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { serverUrl, wsUrl } from "@/data/config";

const httpLink = new HttpLink({
  uri: `${serverUrl}/graphql`,
});

const wsLink = () => {
  try {
    return new GraphQLWsLink(
      createClient({
        url: wsUrl,
      })
    );
  } catch (error) {
    console.error("Error initializing WebSocket connection:", error);
    return null;
  }
};

const client = new ApolloClient({
  link: typeof window === "undefined" ? httpLink : wsLink(),
  cache: new InMemoryCache(),
});

export default client;
