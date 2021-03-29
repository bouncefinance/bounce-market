
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/id/QmZjguTqcfqXWpGanVs3jSaC77W2Riw3rXXc8YaNpfRxZX',
    cache: new InMemoryCache(),
})

export const QueryTradePools = gql`
  query {
    tradePools {
      tokenId
      poolId
      price
      createTime
    }
    tradeAuctions {
      tokenId
      poolId
      lastestBidAmount
      amountMin1
      createTime
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
    bounce721Brands {
      id
    }
    bounce1155Brands {
      id
    }
  }
`

export const  QueryMyNFT = gql`
  query nftItems($user: String!) {
    nft721Items(where: {user: $user}) {
      tokenId
    }
    nft1155Items(where: {user: $user}) {
      tokenId
    }
  }
`

export const QueryOwnerBrandItems = gql`
  query nftItems($owner: String!) {
    bounce721Brands(where: {owner: $owner}) {
      tokenList {
        tokenId
      } 
    }
    bounce1155Brands(where: {owner: $owner}) {
      tokenList {
        tokenId
      }
    }
  }
`

export const QueryBrandTradeItems = gql`
  query brandTradeItems($tokenList: [Int!]!) {
    tradePools(where: {tokenId_in: $tokenList}) {
      tokenId
      poolId
      price
    }
    tradeAuctions(where: {tokenId_in: $tokenList}) {
      tokenId
      poolId
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
  }
`

export const QueryFromActivities = gql`
  query queryActivitiesByAccount($user: Bytes!) {
    activities(where: {from: $user}) {
      event
      contract
      from
      to
      tokenId
      quantity
      timestamp
    }
  }
`

export const QueryToActivities = gql`
  query queryActivitiesByAccount($user: Bytes!) {
    activities(where: {to: $user}) {
      event
      contract
      from
      to
      tokenId
      quantity
      timestamp
    }
  }
`