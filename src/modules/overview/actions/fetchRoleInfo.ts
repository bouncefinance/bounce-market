import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { poolTypeMap } from 'modules/api/common/poolType';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { AuctionType } from '../../api/common/auctionType';

export interface IApiFetchRoleInfo {
  code: 200;
  data: {
    creator: IRoleInfo;
    minter: IRoleInfo;
    likecount: number;
    mylikecount: number;
  };
  msg: 'ok';
}

export interface IRoleInfo {
  address: string;
  avatar: string;
  username: string;
  isVerify?: boolean;
}

interface IFetchRoleInfoData {
  creator: IRoleInfo;
  minter: IRoleInfo;
  likeCount: number;
  isLike: boolean;
}

interface IFetchRoleInfoParams {
  poolId: number;
  poolType: AuctionType;
  address: string;
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
        accountaddress: params.address,
      },
    },
    meta: {
      auth: true,
      driver: 'axios',
      asMutation: false,
      getData: ({ data }) => {
        if (data) {
          return {
            creator: data?.creator,
            minter: data?.minter,
            likeCount: data?.likecount,
            isLike: Boolean(data?.mylikecount),
          };
        }
        const defaultUser = {
          address: '--',
          avatar: '--',
          username: '--',
          isVerify: false,
        };
        return {
          creator: defaultUser,
          minter: defaultUser,
          likeCount: 0,
          isLike: false,
        };
      },
      ...meta,
    },
  }),
);
