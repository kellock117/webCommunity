import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

console.log(process.env.REACT_APP_URI);

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_URI,
});

const authLink = setContext(() => {
  const token = localStorage.getItem(process.env.REACT_APP_KEY);
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
