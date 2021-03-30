
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/winless/bouncenft',
    cache: new InMemoryCache(),
})

export const QueryTradePools = gql`
  query {
    tradePools {
      tokenId
      poolId
      price
      createTime
      state
    }
    tradeAuctions {
      tokenId
      poolId
      lastestBidAmount
      amountMin1
      createTime
      state
    }
  }
`

export const QueryMyTradePools = gql`
  query nftItems($user: String!) {
    tradePools(where: {creator: $user}) {
      tokenId
      poolId
      price
      createTime
      state
    }
    tradeAuctions(where: {creator: $user}) {
      tokenId
      poolId
      lastestBidAmount
      amountMin1
      createTime
      state
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

export const QueryItemsIn721Brand = gql`
  query items($owner: Bytes!) {
    bounce721Brands(where: {owner: $owner}) {
      tokenList {
        tokenId
      }
    }
  }
`

export const QueryItemsIn1155Brand = gql`
  query items($owner: Bytes!) {
    bounce1155Brands(where: {owner: $owner}) {
      tokenList {
        tokenId
      }
    }
  }
`

export const QueryMyNFT = gql`
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

export const QueryFixedSwapPool = gql`
  query fixedSwapPool($poolId: Int!) {
    tradePools(where: {poolId: $poolId}) {
      creator
      price
      amountTotal0
    }
    poolCreates(where: {poolId: $poolId}) {
      timestamp
    }
    poolSwaps(where: {poolId: $poolId}) {
      sender
      swapAmount0
      timestamp
    }
    poolCancels(where: {poolId: $poolId}) {
      sender
      unswappedAmount0
      timestamp
    }
  }
`

export const QueryEnglishAuction  = gql`
  query queryEnglishAuction($poolId: Int!) {
    tradeAuctions(where: { poolId: $poolId })  {
      creator
      tokenAmount0
    }
    auctionCreates(where:{poolId: $poolId}) {
      timestamp
    }
    auctionBids(where:{poolId: $poolId}) {
      sender
      amount1
      timestamp
    }
    auctionClaims(where:{poolId: $poolId}) {
      sender	
      amount0
      amount1
      timestamp
    }
  }
`