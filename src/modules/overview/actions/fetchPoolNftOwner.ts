import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { AuctionType } from '../api/auctionType';
import { poolTypeMap } from 'modules/common/api/poolType';
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
  balance: number;
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
      url: '/api/v2/main/getowners',
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
        console.log(data);
        return data?.owners
          .map(item => {
            return {
              owner: {
                address: item.owneraddress,
                avatar: item.avatar,
                username: item.username,
              },
              balance: +item.balance,
            };
          })
          .sort((a, b) => {
            return b.balance - a.balance;
          });
      },
      ...meta,
    },
  }),
);
