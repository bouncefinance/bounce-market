import { gql } from '@apollo/client';
import { getApolloClient } from '../../common/api/getApolloClient';

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
`;

export async function getMarketplaceItems() {
  return await getApolloClient().query({ query: QueryTradePools });
}
