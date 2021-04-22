import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    'https://subgraph_official_bsc.bounce.finance/subgraphs/name/winless/BounceNFT',
  cache: new InMemoryCache(),
});

export function getApolloClient() {
  return client;
}
