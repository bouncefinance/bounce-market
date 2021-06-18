import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { AuctionType } from '../api/auctionType';
import { poolTypeMap } from 'modules/common/api/poolType';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { IRoleInfo } from './fetchRoleInfo';

export interface IApiFetchPoolBids {
  code: 200;
  data: IFetchPoolBidsData[];
  msg: 'ok';
}

interface IFetchPoolBidsData {
  amount1: string;
  avatar: string;
  created_at: string;
  ctime: number;
  height: number;
  pool_id: number;
  sender: string;
  txid: string;
  username: string;
}

interface IFetchPoolBidsParams {
  poolId: number;
  poolType: AuctionType;
}

interface wrapperPoolBids {
  sender: IRoleInfo;
  txId: string;
  time: number;
  price: string;
  symbol: string;
}

export const fetchPoolBids = createSmartAction<
  RequestAction<IApiFetchPoolBids, wrapperPoolBids[]>
>(
  'fetchPoolBids',
  (
    params: IFetchPoolBidsParams,
    meta?: RequestActionMeta<IApiFetchPoolBids, wrapperPoolBids[]>,
  ) => ({
    request: {
      url: '/api/v2/main/getpoolbids',
      method: 'post',
      data: {
        poolId: params.poolId,
        poolType: parseInt(poolTypeMap[params.poolType]),
      },
    },
    meta: {
      auth: true,
      driver: 'axiosSmartchain',
      asMutation: false,
      getData: ({ data }) => {
        return data
          .map(item => {
            return {
              sender: {
                address: item.sender,
                avatar: item.avatar,
                username: item.username,
              },
              txId: item.txid,
              time: item.ctime * 1000,
              price: new BigNumber(Web3.utils.fromWei(item.amount1)).toString(),
              symbol: 'BNB',
            };
          })
          .sort((a, b) => {
            return b.time - a.time;
          });
      },
      ...meta,
    },
  }),
);
