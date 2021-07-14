import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { poolTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { AuctionType } from '../../api/common/auctionType';
import { IRoleInfo } from './fetchRoleInfo';

export interface IApiFetchPoolNftOwner {
  code: 200;
  data: {
    owners: IFetchPoolNftOwnerData[];
    total: number;
  };
  msg: 'ok';
}

interface IFetchPoolNftOwnerData {
  avatar: string;
  balance: string;
  owneraddress: string;
  username: string;
}

interface IFetchPoolNftOwnerParams {
  poolId: number;
  poolType: AuctionType;
}

interface wrapperPoolNftOwner {
  owner: IRoleInfo;
  balance: BigNumber;
}

export const fetchPoolNftOwner = createSmartAction<
  RequestAction<IApiFetchPoolNftOwner, wrapperPoolNftOwner[]>
>(
  'fetchPoolNftOwner',
  (
    params: IFetchPoolNftOwnerParams,
    meta?: RequestActionMeta<IApiFetchPoolNftOwner, wrapperPoolNftOwner[]>,
  ) => ({
    request: {
      url: '/getowners',
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
        return data?.owners
          .map(item => {
            return {
              owner: {
                address: item.owneraddress,
                avatar: item.avatar,
                username: item.username,
              },
              balance: new BigNumber(item.balance),
            };
          })
          .sort((a, b) => {
            return b.balance.toNumber() - a.balance.toNumber();
          });
      },
      ...meta,
    },
  }),
);
