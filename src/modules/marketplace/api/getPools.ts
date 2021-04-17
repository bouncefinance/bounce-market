import { gql } from '@apollo/client';
import { getApolloClient } from '../../common/api/getApolloClient';
import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';
import { AuctionType } from './auctionType';

export enum AuctionState {
  InProgress,
  Done,
}

interface IApiTradeItem {
  tokenId: number;
  poolId: number;
  token1: string;
  createTime: number;
  state: AuctionState;
}

export interface ITradeItem {
  tokenId: number;
  poolId: number;
  token1: string;
  createTime: Date;
  state: AuctionState;
  price: BigNumber;
  poolType: AuctionType;
}

function mapTradeItem(
  data: IApiTradeItem,
): Omit<ITradeItem, 'price' | 'poolType'> {
  return {
    ...data,
    createTime: new Date(data.createTime),
  };
}

interface IApiTradeAuction extends IApiTradeItem {
  lastestBidAmount: string;
  amountMin1: string;
  __typename: 'TradeAuction';
}

interface ITradeAuction extends ITradeItem {
  poolType: AuctionType.EnglishAuction;
}

function mapTradeAuction(data: IApiTradeAuction): ITradeAuction {
  return {
    ...mapTradeItem(data),
    price: new BigNumber(
      Web3.utils.fromWei(
        data.lastestBidAmount !== '0' ? data.lastestBidAmount : data.amountMin1,
      ),
    ),
    poolType: AuctionType.EnglishAuction,
  };
}

interface IApiTradePool extends IApiTradeItem {
  price: string;
  __typename: 'TradePool';
}

interface ITradePool extends ITradeItem {
  poolType: AuctionType.FixedSwap;
}

function mapTradePool(data: IApiTradePool): ITradePool {
  return {
    ...mapTradeItem(data),
    price: new BigNumber(data.price),
    poolType: AuctionType.FixedSwap,
  };
}

export const QueryTradePools = gql`
  query {
    tradePools {
      tokenId
      poolId
      token1
      createTime
      state
      price
    }
    tradeAuctions {
      tokenId
      poolId
      token1
      createTime
      state
      lastestBidAmount
      amountMin1
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
