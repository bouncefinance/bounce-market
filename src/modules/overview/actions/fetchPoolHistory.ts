import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { AuctionType } from '../api/auctionType';
import { poolTypeMap } from 'modules/common/api/poolType';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { IRoleInfo } from './fetchRoleInfo';

export interface IApiFetchPoolHistory {
  code: 200;
  data: IFetchPoolHistoryData[];
  msg: 'ok';
}

enum AUCTION_EVENT {
  FixedSwapCreated = 'FixedSwapCreated',
  FixedSwapSwapped = 'FixedSwapSwapped',
  FixedSwapCanceled = 'FixedSwapCanceled',
  EnglishCreated = 'EnglishCreated',
  EnglishClaimed = 'EnglishClaimed',
}

interface IFetchPoolHistoryData {
  auction_event: AUCTION_EVENT;
  auction_type: number;
  avatar: string;
  contract: string;
  created_at: string;
  ctime: number;
  from: string;
  height: number;
  pool_id: number;
  price: string;
  quantity: number;
  to: string;
  token_id: number;
  txid: string;
  user_address: string;
  username: string;
}

interface IFetchPoolHistoryParams {
  poolId: number;
  poolType: AuctionType;
}

export interface IWrapperPoolHistory {
  event: AUCTION_EVENT;
  sender: IRoleInfo;
  quantity: number;
  price: BigNumber;
  time: Date;
}

export const fetchPoolHistory = createSmartAction<
  RequestAction<IApiFetchPoolHistory, IWrapperPoolHistory[]>
>(
  'fetchPoolHistory',
  (
    params: IFetchPoolHistoryParams,
    meta?: RequestActionMeta<IApiFetchPoolHistory, IWrapperPoolHistory[]>,
  ) => ({
    request: {
      url: '/api/v2/main/getpoolactivities',
      method: 'post',
      data: {
        poolId: params.poolId,
        poolType: parseInt(poolTypeMap[params.poolType]),
      },
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
      getData: ({ data }) => {
        return data
          .map(item => {
            return {
              event: item.auction_event,
              sender: {
                username: item.username,
                address: item.user_address,
                avatar: item.avatar,
              },
              quantity: item.quantity,
              price: new BigNumber(Web3.utils.fromWei(item.price)),
              time: new Date(item.ctime * 1000),
            };
          })
          .sort((a, b) => {
            return b.time.getTime() - a.time.getTime();
          });
      },
      ...meta,
    },
  }),
);
