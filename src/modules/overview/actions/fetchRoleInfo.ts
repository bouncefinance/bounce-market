import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { poolTypeMap } from 'modules/api/common/poolType';
import { UserRoleEnum } from 'modules/common/actions/queryAccountInfo';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { AuctionType } from '../../api/common/auctionType';

export interface IApiFetchRoleInfo {
  code: 200;
  data: {
    creator: IRoleInfo;
    minter: IRoleInfo;
    collection: IRoleInfo;
    likecount: number;
    mylikecount: number;
  };
  msg: 'ok';
}

export interface IRoleInfo {
  address: string;
  avatar: string;
  username: string;
  identity?: number;
  isVerify?: boolean;
  name?: string;
}

interface IFetchRoleInfoData {
  creator: IRoleInfo;
  minter: IRoleInfo;
  collection: IRoleInfo;
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
            creator: {
              ...data?.creator,
              isVerify: data?.creator.identity === UserRoleEnum.Verified,
            },
            minter: {
              ...data?.minter,
              isVerify: data?.minter.identity === UserRoleEnum.Verified,
            },
            collection: {
              ...data?.collection,
              isVerify: data?.collection.identity === UserRoleEnum.Verified,
            },
            likeCount: data?.likecount,
            isLike: Boolean(data?.mylikecount),
          };
        }
        const defaultUser = {
          address: '--',
          avatar: '--',
          username: '--',
          name: '',
          isVerify: false,
          identity: 0,
        };
        return {
          creator: defaultUser,
          minter: defaultUser,
          collection: defaultUser,
          likeCount: 0,
          isLike: false,
        };
      },
      ...meta,
    },
  }),
);
