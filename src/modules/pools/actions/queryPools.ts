import { RequestAction } from '@redux-requests/core';
import { FANGIBLE_URL } from 'modules/common/conts';
import { createAction as createSmartAction } from 'redux-smart-actions';

// TODO: Merge with src/modules/profile/api/getPoolsByFilter.ts

export interface IQueryPool {
  englishTotal: number;
  fixedSwapTotal: number;
  tradeAuctions: {
    amountMax1: string;
    amountMin1: string;
    amountMinIncr1: string;
    bidderClaimed: boolean;
    closeAt: number;
    createTime: number;
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
    createTime: number;
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

export interface IApiQueryPool {
  code: 200 | number;
  data: IQueryPool;
}

export const queryPools = createSmartAction<
  RequestAction<IApiQueryPool, IQueryPool>
>('queryPoolsAction', (address: string) => ({
  request: {
    url: `${FANGIBLE_URL}/pools?offset=0&count=10000&user_address=${address}`,
    method: 'get',
  },
  meta: {
    driver: 'axiosSmartchain',
    asMutation: true,
    getData: data => {
      if (data.code !== 200) {
        throw new Error('Unexpected response');
      }
      return data.data;
    },
  },
}));
