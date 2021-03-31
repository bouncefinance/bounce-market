
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
  // uri: 'https://api.thegraph.com/subgraphs/id/QmNRFKSQSVgVbYe6fmJUV3hcZLh8ngMdGCht41wX3xq3Qv',  // rinkby
  uri: 'https://api.thegraph.com/subgraphs/name/winless/bouncenft2',     // bsc mian
  cache: new InMemoryCache(),
})

export const QueryTradePools = gql`
  query {
    tradePools {
      tokenId
      poolId
      token1
      price
      createTime
      state
    }
    tradeAuctions {
      tokenId
      poolId
      token1
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
      token1
      createTime
      state
    }
    tradeAuctions(where: {creator: $user}) {
      tokenId
      poolId
      token1
      lastestBidAmount
      amountMin1
      createTime
      state
    }
  }
`

export const QueryMyPools = gql`
  query myPools($user: String!) {
    tradePools(where: {creator: $user}) {
      tokenId
      poolId
      price
      token1
      createTime
      state
    }
    tradeAuctions(where: {creator: $user}) {
      tokenId
      poolId
      token1
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

export const QueryMyNFTByBrand = gql`
  query nftItems($user: String!, $contract: String!) {
    nft721Items(where: {user: $user, contract: $contract}) {
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
      createTime
      state
    }
    tradeAuctions(where: {tokenId_in: $tokenList}) {
      tokenId
      poolId
      lastestBidAmount
      amountMin1
      createTime
      state
    }
  }
`

export const QueryBrandTradeItemsByBrand = gql`
  query brandTradeItems($creator: String!, $token0: String!) {
    tradePools(where: {creator: $creator ,token0:$token0}) {
      tokenId
      poolId
      price
      createTime
      token1
      state
    }
    tradeAuctions(where: {creator: $creator, token0:$token0}) {
      tokenId
      poolId
      lastestBidAmount
      amountMin1
      createTime
      token1
      state
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
      id
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
      id
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

export const QueryEnglishAuction = gql`
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

export const TestQuery = gql`
  query fixedSwapPool($poolId: Int!) {
    poolCreates(where: {poolId: $poolId}) {
      timestamp
    }
  }
`