import { gql } from '@apollo/client';
import { getApolloClient } from '../../common/api/getApolloClient';
import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';

interface IApiTradeAuction {
  amountMin1: string;
  createTime: number;
  lastestBidAmount: string;
  poolId: number;
  state: 0;
  token1: string;
  tokenId: number;
  __typename: 'TradeAuction';
}

interface ITradeAuction {
  amountMin1: BigNumber;
  createTime: Date;
  lastestBidAmount: BigNumber;
  poolId: number;
  state: number;
  token1: string;
  tokenId: number;
}

function mapTradeAuction(data: IApiTradeAuction): ITradeAuction {
  return {
    amountMin1: new BigNumber(Web3.utils.fromWei(data.amountMin1)),
    createTime: new Date(data.createTime),
    lastestBidAmount: new BigNumber(Web3.utils.fromWei(data.lastestBidAmount)),
    poolId: data.poolId,
    state: data.state,
    token1: data.token1,
    tokenId: data.tokenId,
  };
}

interface IApiTradePool {
  createTime: number;
  poolId: 0;
  price: string;
  state: 1;
  token1: string;
  tokenId: number;
  __typename: 'TradePool';
}

interface ITradePool {
  createTime: Date;
  price: BigNumber;
  tokenId: number;
}

function mapTradePool(data: IApiTradePool): ITradePool {
  return {
    createTime: new Date(data.createTime),
    price: new BigNumber(Web3.utils.fromWei(data.price)),
    tokenId: data.tokenId,
  };
}

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

interface IApiResponse {
  tradeAuctions: IApiTradeAuction[];
  tradePools: IApiTradePool[];
}

export async function getMarketplaceItems(): Promise<{
  tradeAuctions: ITradeAuction[];
  tradePools: ITradePool[];
}> {
  const query = await getApolloClient().query<IApiResponse>({
    query: QueryTradePools,
  });

  return {
    tradeAuctions: query.data.tradeAuctions.map(mapTradeAuction),
    tradePools: query.data.tradePools.map(mapTradePool),
  };
}
