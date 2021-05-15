import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { Address, Seconds } from '../../common/types/unit';
import { NftType } from '../../createNFT/actions/createNft';
import { AuctionState } from '../../common/const/AuctionState';

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

interface IApiPoolsData {
  code: 200;
  data: {
    englishTotal: 0;
    fixedSwapTotal: 0;
    tradeAuctions: null;
    tradePools?: IApiPool[];
  };
  msg: 'ok';
}

interface IPool {
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

function mapPool(data: IApiPool): IPool {
  return {
    quantity: data.amount_total0,
    totalPrice: new BigNumber(Web3.utils.fromWei(data.amount_total1)),
    createTime: new Date(data.createTime * 1000),
    creator: data.creator,
    name: data.name,
    nftType: data.nftType,
    poolId: data.poolId,
    price: new BigNumber(Web3.utils.fromWei(data.price)),
    state: data.state,
    tokenContract: data.token0,
    unitContract: data.token1,
    tokenId: data.tokenId,
  };
}

interface IPoolsData {
  list: IPool[];
}

export const getPoolsByFilter = createAction<
  RequestAction<IApiPoolsData, IPoolsData>,
  [
    {
      user?: string;
    }?,
    RequestActionMeta<IApiPoolsData, IPoolsData>?,
  ]
>('getPoolsByFilter', (params, meta) => ({
  request: {
    url: 'https://api1-bsc.fangible.com/v1/bsc_test/pools',
    method: 'get',
    params: { user_address: params?.user, offset: 0, count: 100 },
  },
  meta: {
    driver: 'axios',
    getData: response => {
      // TODO parse the response
      if (response.code !== 200) {
        throw new Error(response.msg);
      }

      return { list: response.data.tradePools?.map(mapPool) ?? [] };
    },
    ...meta,
  },
}));
