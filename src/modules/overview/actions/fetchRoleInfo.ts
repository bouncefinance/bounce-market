import { createAction as createSmartAction } from 'redux-smart-actions';
import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { AuctionType, AuctionType_number } from '../api/auctionType';

export interface IApiFetchRoleInfo {
  code: 200;
  data: IFetchRoleInfoData;
  msg: 'ok';
}

interface IRoleInfo {
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
      url: '/api/v2/main/getpoolinfo',
      method: 'post',
      data: {
        poolid: params.poolId,
        pooltype:
          params.poolType === AuctionType.FixedSwap
            ? AuctionType_number.FixedSwap
            : AuctionType_number.EnglishAuction,
      },
    },
    meta: {
      auth: true,
      driver: 'axiosSmartchain',
      asMutation: false,
      getData: ({ data }) => {
        console.log(data);
        return data as IFetchRoleInfoData;
      },
      ...meta,
    },
  }),
);
