import { ApolloClient, InMemoryCache } from '@apollo/client';
import { historyInstance } from '../utils/historyInstance';

const hostname = historyInstance.location.pathname;

const client = new ApolloClient({
  uri:
    hostname.includes('market.bounce.finance') || hostname.includes('127.0.0.1')
      ? 'https://api.thegraph.com/subgraphs/name/winless/bouncenft' // bsc main
      : 'https://api.thegraph.com/subgraphs/name/winless/bouncenft2', // bsc test
  cache: new InMemoryCache(),
});

export function getApolloClient() {
  return client;
}
