import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { poolTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { AuctionType } from '../../api/common/auctionType';

export interface IApiFetchRoleInfo {
  code: 200;
  data: IFetchRoleInfoData;
  msg: 'ok';
}

export interface IRoleInfo {
  address: string;
  avatar: string;
  username: string;
}

interface IFetchRoleInfoData {
  creator: IRoleInfo;
  minter: IRoleInfo;
}

interface IFetchRoleInfoParams {
  poolId: number;
  poolType: AuctionType;
}

export const fetchRoleInfo = createSmartAction<
  RequestAction<IApiFetchRoleInfo, IFetchRoleInfoData>
>(
  'fetchRoleInfo',
  (
    params: IFetchRoleInfoParams,
    meta?: RequestActionMeta<IApiFetchRoleInfo, IFetchRoleInfoData>,
  ) => ({
    request: {
      url: '/getpoolinfo',
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
        return data as IFetchRoleInfoData;
      },
      ...meta,
    },
  }),
);
