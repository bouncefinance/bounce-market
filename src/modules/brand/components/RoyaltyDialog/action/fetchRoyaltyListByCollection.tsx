import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { NFTCategoryType } from 'modules/overview/actions/fetchItemsByFilter';

export interface IRoyaltyListParams {
  collection: string;
  limit?: number;
  offset?: number;
}

interface IRoyaltyListRes_ {
  code: number;
  msg: string;
  data: IRoyaltyListRes;
}

interface IRoyaltyListRes {
  total: number;
  currentratio: number;
  list: {
    collection: string;
    ctime: number;
    feeEarned: string;
    item: string;
    category: NFTCategoryType;
    nftTotalNum: number;
    nfturl: string;
    price: string;
    decimal: number;
    quantity: number;
    symbol: string;
    txid: string;
  }[];
}

export interface IRoyaltyMapListRes {
  total: number;
  currentratio: BigNumber;
  list: {
    collection: string;
    ctime: Date;
    feeEarned: BigNumber;
    item: string;
    category: NFTCategoryType;
    nftTotalNum: number;
    nfturl: string;
    price: BigNumber;
    decimal: number;
    quantity: number;
    symbol: string;
    txid: string;
  }[];
}

const mapRoyaltyList: (res: IRoyaltyListRes_) => IRoyaltyMapListRes = res => {
  const { data } = res;

  return {
    total: data.total,
    currentratio: new BigNumber(data.currentratio).div(
      new BigNumber(10).pow(16),
    ),
    list: data.list.map(item => {
      return {
        ...item,
        ctime: new Date(item.ctime * 1000),
        feeEarned: new BigNumber(item.feeEarned),
        price: new BigNumber(item.price).div(
          new BigNumber(10).pow(item.decimal || 18),
        ),
      };
    }),
  };
};

export const fetchRoyaltyListByCollection = createSmartAction<
  RequestAction<IRoyaltyListRes_, IRoyaltyMapListRes>,
  [IRoyaltyListParams]
>('fetchRoyaltyListByCollection', payload => ({
  request: {
    url: '/auth/get_royalties_list',
    method: 'post',
    data: {
      collection: payload.collection,
      limit: payload.limit || 10,
      offset: payload.offset || 0,
    },
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      // console.log(data)
      if (data.code !== 200) {
        return {
          total: 0,
          currentratio: new BigNumber(0),
          list: [],
        };
      }
      return mapRoyaltyList(data);
    },
  },
}));
