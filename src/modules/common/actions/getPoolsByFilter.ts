import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { IApiQueryPool, IQueryPool } from 'modules/pools/actions/queryPools';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { AuctionState } from '../../api/common/AuctionState';
import { NftType } from '../../api/common/NftType';
import { Address, Seconds } from '../types/unit';

interface IApiPool {
  amount_total0: number;
  amount_total1: string;
  createTime: Seconds;
  creator: Address;
  name: string;
  // TODO: Check how it's mapping
  nftType: 0;
  poolId: number;
  price: string;
  state: AuctionState;
  token0: Address;
  token1: Address;
  tokenId: number;
}

export interface IPool {
  quantity: number;
  totalPrice: BigNumber;
  createTime: Date;
  creator: Address;
  name: string;
  nftType: NftType;
  poolId: number;
  price: BigNumber;
  state: AuctionState;
  tokenContract: Address;
  unitContract: Address;
  tokenId: number;
}

function mapPool(data: IQueryPool): IPool {
  return {
    quantity: data.token_amount0,
    totalPrice: new BigNumber(Web3.utils.fromWei(data.amount_total1)),
    createTime: new Date(data.created_at),
    creator: data.creator,
    name: data.name,
    nftType: data.nft_type,
    poolId: data.pool_id,
    price: new BigNumber(Web3.utils.fromWei(data.price)),
    state: data.state,
    tokenContract: data.token0,
    unitContract: data.token1,
    tokenId: data.token_id,
  };
}

export interface IPoolsData {
  list: IPool[];
}

export const getPoolsByFilter = createAction<
  RequestAction<IApiQueryPool, IPoolsData>,
  [
    {
      user?: string;
      offset?: number;
      count?: number;
    }?,
    RequestActionMeta<IApiQueryPool, IPoolsData>?,
  ]
>('getPoolsByFilter', (params, meta) => ({
  request: {
    url: '/pools',
    method: 'get',
    params: {
      user_address: params?.user,
      offset: params?.offset || 0,
      count: params?.count || 100,
    },
  },
  meta: {
    driver: 'axios',
    getData: response => {
      // TODO: parse the response
      if (response.code !== 1) {
        throw new Error('Unexpected response');
      }
      const tradePools = response.data.pools.filter(
        item => item.auctiontype === 1,
      );
      return { list: tradePools.map(mapPool) ?? [] };
    },
    ...meta,
  },
}));
