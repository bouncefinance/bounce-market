import { gql } from '@apollo/client';
import { getApolloClient } from '../../common/api/getApolloClient';
import { IApiGetPoolsResponse, IPoolsData, mapPools } from './getPools';

export const QueryTradePoolsByUser = gql`
  query nftItems($user: String!) {
    tradePools(where: { creator: $user }) {
      tokenId
      poolId
      price
      token0
      token1
      createTime
      state
    }
    tradeAuctions(where: { creator: $user }) {
      tokenId
      poolId
      token0
      token1
      lastestBidAmount
      amountMin1
      createTime
      state
    }
  }
`;

export interface IApiGetPoolsByUserVariables {
  user: string;
}

export async function getPoolsByUser(
  payload: IApiGetPoolsByUserVariables,
): Promise<IPoolsData> {
  const query = await getApolloClient().query<IApiGetPoolsResponse>({
    query: QueryTradePoolsByUser,
    variables: payload,
  });

  return mapPools(query.data);
}
