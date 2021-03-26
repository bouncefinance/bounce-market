
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/id/QmZi2uuo9jYTuBNnHyig2Gf8TK2BEErKbvrWA8kfYN8bfg',
    //uri: 'https://api.thegraph.com/subgraphs/name/winless/bouncenft2',
    cache: new InMemoryCache(),
})

export const QueryTradePools = gql`
  query {
    tradePools {
      tokenId
    }
  }
`

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

export const QueryBrandItems = gql`
  query {
    bounce721Brands {
      tokenList {
        tokenId
      }
    }
    bounce1155Brands {
      tokenList {
        tokenId
      }
    }
  }
`

export const QueryMyNFT = gql`
  query nft721Items($user: String!) {
    nft721Items(user: $user) {
      tokenId
    }
    nft1155Items(user: $user) {
      tokenId
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