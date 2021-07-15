import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { poolTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { AuctionType } from '../../api/common/auctionType';
import { IRoleInfo } from './fetchRoleInfo';

export interface IApiFetchPoolBids {
  code: 200;
  data: IFetchPoolBidsData_EnglishAuction[] | IFetchPoolBidsData_FixedSwap[];
  msg: 'ok';
}

interface IFetchPoolBidsData_EnglishAuction {
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

interface IFetchPoolBidsData_FixedSwap {
  height: number;
  txid: string;
  pool_id: number;
  contract: string;
  from: string;
  to: string;
  token_id: number;
  quantity: number;
  price: string;
  user_address: string;
  auction_event: string;
  auction_type: number;
  ctime: number;
  created_at: string;
  username: string;
  avatar: string;
}

interface IFetchPoolBidsParams {
  poolId: number;
  poolType: AuctionType;
}

interface IWrapperPoolBids {
  sender: IRoleInfo;
  txId: string;
  time: Date;
  price: BigNumber;
  currency: string;
}

function isApiEnglishAuction(
  data: IFetchPoolBidsData_FixedSwap | IFetchPoolBidsData_EnglishAuction,
): data is IFetchPoolBidsData_EnglishAuction {
  return !!(data as IFetchPoolBidsData_EnglishAuction)?.amount1;
}

export const fetchPoolBids = createSmartAction<
  RequestAction<IApiFetchPoolBids, IWrapperPoolBids[]>
>(
  'fetchPoolBids',
  (
    params: IFetchPoolBidsParams,
    meta?: RequestActionMeta<IApiFetchPoolBids, IWrapperPoolBids[]>,
  ) => ({
    request: {
      url: '/getpoolbids',
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
        if (data.length !== 0) {
          if (isApiEnglishAuction(data[0])) {
            return (data as IFetchPoolBidsData_EnglishAuction[])
              .map(item => {
                return {
                  sender: {
                    address: item.sender,
                    avatar: item.avatar,
                    username: item.username,
                  },
                  txId: item.txid,
                  time: new Date(item.ctime * 1000),
                  price: new BigNumber(Web3.utils.fromWei(item.amount1)),
                  currency: item.amount1,
                };
              })
              .sort((a, b) => {
                return b.time.getTime() - a.time.getTime();
              });
          } else {
            return (data as IFetchPoolBidsData_FixedSwap[])
              .map(item => {
                return {
                  sender: {
                    address: item.to,
                    avatar: item.avatar,
                    username: item.username,
                  },
                  txId: item.txid,
                  time: new Date(item.ctime * 1000),
                  price: new BigNumber(Web3.utils.fromWei(item.price)),
                  currency: item.contract,
                };
              })
              .sort((a, b) => {
                return b.time.getTime() - a.time.getTime();
              });
          }
        } else {
          return [];
        }
      },
      ...meta,
    },
  }),
);
