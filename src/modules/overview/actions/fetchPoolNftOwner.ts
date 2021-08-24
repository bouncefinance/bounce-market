import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { PoolType, poolTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { AuctionType } from '../../api/common/auctionType';
import { IRoleInfo } from './fetchRoleInfo';

export interface IApiFetchPoolNftOwner {
  code: 200;
  data: IFetchPoolNftOwnerData[];
  msg: string;
}

interface IFetchPoolNftOwnerData {
  owner: {
    address: string;
    avatar: string;
    identity: number;
    name: string;
  };
  poolId: number;
  poolType: PoolType;
  quantity: number;
}

interface IFetchPoolNftOwnerParams {
  poolId: number;
  poolType: AuctionType;
}

interface wrapperPoolNftOwner {
  owner: IRoleInfo;
  quantity: BigNumber;
  poolType: PoolType;
  poolId: number;
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
      url: '/get_owners',
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
          ?.map(item => {
            return {
              owner: {
                address: item.owner.address,
                avatar: item.owner.avatar,
                username: item.owner.name,
                isVerify: item.owner.identity === 2,
              },
              quantity: new BigNumber(item.quantity),
              poolType: item.poolType,
              poolId: item.poolId,
            };
          })
          .sort((a, b) => {
            if (a.poolId === params.poolId) {
              return -1;
            }
            return 1;
          });
      },
      ...meta,
    },
  }),
);
