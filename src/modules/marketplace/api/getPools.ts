import { gql } from '@apollo/client';
import { getApolloClient } from '../../common/api/getApolloClient';
import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';

enum State {
  InProgress,
  Done,
}

interface IApiTradeAuction {
  amountMin1: string;
  createTime: number;
  lastestBidAmount: string;
  poolId: number;
  state: State;
  token1: string;
  tokenId: number;
  __typename: 'TradeAuction';
}

interface ITradeAuction {
  price: BigNumber;
  createTime: Date;
  poolId: number;
  state: State;
  token1: string;
  tokenId: number;
}

function mapTradeAuction(data: IApiTradeAuction): ITradeAuction {
  return {
    createTime: new Date(data.createTime),
    price: new BigNumber(
      Web3.utils.fromWei(
        data.lastestBidAmount !== '0' ? data.lastestBidAmount : data.amountMin1,
      ),
    ),
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
  state: State;
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

const sortByTime = (
  a: Pick<IApiTradeAuction, 'createTime'>,
  b: Pick<IApiTradeAuction, 'createTime'>,
) => b.createTime - a.createTime;

export interface IPoolsData {
  tradeAuctions: ITradeAuction[];
  tradePools: ITradePool[];
}

export async function getPools(): Promise<IPoolsData> {
  const query = await getApolloClient().query<IApiResponse>({
    query: QueryTradePools,
  });

  return {
    tradeAuctions: query.data.tradeAuctions
      .slice()
      .sort(sortByTime)
      .map(mapTradeAuction),
    tradePools: query.data.tradePools
      .slice()
      .sort(sortByTime)
      .map(mapTradePool),
  };
}
