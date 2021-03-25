
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/winless/bouncenft2',
    cache: new InMemoryCache(),
})

export const QueryItesms = gql`
  query {
    bounce721Items {
      tokenId
    }
    bounce1155Items {
      tokenId
    }
  }
`

export const QueryBrands = gql`
  query {
    bounce721Brands(first: 3) {
      id
    }
    bounce1155Brands(first: 3) {
      id
    }
  }
`

export const QueryBrand721 = gql`
  query {
    bounce721Brands {
      id
      owner
      nft
      tokenCnt
      tokenList {
        tokenId
      }
    }
  }`