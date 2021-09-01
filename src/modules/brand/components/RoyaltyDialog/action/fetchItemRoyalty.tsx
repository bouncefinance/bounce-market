import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';
import { AuctionType } from 'modules/api/common/auctionType';

export type IItemRoyaltyParams = NFTItem | PoolItem;

interface NFTItem {
  collection: string;
  tokenId: number;
}

interface PoolItem {
  auctionType: AuctionType;
  poolId: number;
}

interface IItemRoyaltyRes_ {
  code: number;
  msg: string;
  data: {
    collection: string;
    currentratio: number;
    fangibleFee: string;
  };
}

export interface IItemRoyaltyRes {
  platformFee: BigNumber;
  royaltyFee: BigNumber;
  remainingRatio: BigNumber;
}

const mapItemRoyalty: (res: IItemRoyaltyRes_) => IItemRoyaltyRes = res => {
  const { data } = res;
  return {
    platformFee: new BigNumber(data.fangibleFee),
    royaltyFee: new BigNumber(data.currentratio).div(new BigNumber(10).pow(16)),
    remainingRatio: new BigNumber(1)
      .minus(new BigNumber(data.fangibleFee).div(100))
      .minus(new BigNumber(data.currentratio).div(new BigNumber(10).pow(18))),
  };
};

export const fetchItemRoyalty = createSmartAction<
  RequestAction<IItemRoyaltyRes_, IItemRoyaltyRes | null>,
  [IItemRoyaltyParams]
>('fetchItemRoyalty', payload => ({
  request: {
    url: '/get_royaltiy_ratio',
    method: 'post',
    data: payload,
  },
  meta: {
    auth: true,
    driver: 'axios',
    asMutation: false,
    getData: data => {
      if (data.code !== 200) {
        return null;
      }
      return mapItemRoyalty(data);
    },
  },
}));
