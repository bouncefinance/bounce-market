import { RequestAction } from '@redux-requests/core';
import { AuctionTypeKeys } from 'modules/api/common/auctionType';
import { createAction as createSmartAction } from 'redux-smart-actions';

// TODO: Merge with src/modules/profile/api/getPoolsByFilter.ts

export interface IQueryPool {
  amount_max1: string;
  amount_min1: string;
  amount_min_incr1: string;
  amount_total1: string;
  auctiontype: AuctionTypeKeys;
  bidder_claimed: boolean;
  open_at: number;
  close_at: number;
  created_at: string;
  creator: string;
  creator_claimed: false;
  ctime: number;
  duration: number;
  height: number;
  id: number;
  name: string;
  nft_type: number;
  pool_id: number;
  price: string;
  state: number;
  swapped_amount0: number;
  token0: string;
  token1: string;
  token_amount0: number;
  token_id: number;
  identity: number;
  last_bidder: string;
}
export interface IQueryPools {
  tradeAuctions: {
    amountMax1: string;
    amountMin1: string;
    amountMinIncr1: string;
    bidderClaimed: boolean;
    closeAt: number;
    createTime: string;
    creator: string;
    creatorClaimed: boolean;
    duration: number;
    lastestBidAmount: string;
    name: string;
    nftType: number;
    poolId: number;
    state: number;
    token0: string;
    token1: string;
    tokenAmount0: number;
    tokenId: number;
  }[];
  tradePools: {
    amount_total0: number;
    amount_total1: string;
    createTime: string;
    creator: string;
    name: string;
    nftType: number;
    poolId: number;
    price: string;
    state: number;
    token0: string;
    token1: string;
    tokenId: number;
  }[];
}

export const mapPool = (pools: IQueryPool[]): IQueryPools => {
  const tradePools = pools
    .filter((item: IQueryPool) => item.auctiontype === 1)
    .map((item: IQueryPool) => ({
      amount_total0: item.token_amount0,
      amount_total1: item.amount_total1,
      createTime: item.created_at,
      creator: item.creator,
      name: item.name,
      nftType: item.nft_type,
      poolId: item.pool_id,
      price: item.price,
      state: item.state,
      token0: item.token0,
      token1: item.token1,
      tokenId: item.token_id,
    }));
  const tradeAuctions = pools
    .filter((item: IQueryPool) => item.auctiontype === 2)
    .map((item: IQueryPool) => ({
      amountMax1: item.amount_max1,
      amountMin1: item.amount_min1,
      amountMinIncr1: item.amount_min_incr1,
      bidderClaimed: item.bidder_claimed,
      closeAt: item.close_at,
      createTime: item.created_at,
      creator: item.creator,
      creatorClaimed: item.creator_claimed,
      duration: item.duration,
      lastestBidAmount: item.price,
      name: item.name,
      nftType: item.nft_type,
      poolId: item.pool_id,
      state: item.state,
      token0: item.token0,
      token1: item.token1,
      tokenAmount0: item.token_amount0,
      tokenId: item.token_id,
    }));
  return {
    tradeAuctions: tradeAuctions,
    tradePools: tradePools,
  };
};

export interface IApiQueryPool {
  code: 1 | number;
  data: {
    pools: IQueryPool[];
  };
}

export const queryPools = createSmartAction<
  RequestAction<IApiQueryPool, IQueryPools>
>('queryPoolsAction', (address: string) => ({
  request: {
    url: `/pools?offset=0&count=10000&user_address=${address}`,
    method: 'get',
  },
  meta: {
    driver: 'axios',
    asMutation: true,
    getData: data => {
      if (data.code !== 0 && data.code !== 1) {
        throw new Error('Unexpected response');
      }

      const pools: IQueryPool[] = data.data?.pools || [];
      return mapPool(pools);
    },
  },
}));
