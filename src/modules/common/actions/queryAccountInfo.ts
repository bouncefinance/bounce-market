import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { truncateWalletAddr } from '../utils/truncateWalletAddr';

/**
 * User Role
 * 1 normal
 * 2 verified
 */
export type UserRoleType = 1 | 2;
export enum UserRoleEnum {
  Normal = 1,
  Verified = 2,
}

interface IApiAccountInfo {
  code: number;
  msg?: string;
  data?: {
    fullname: string;
    imgurl: string;
    username: string;
    identity: UserRoleType;
  };
}

export interface IAccountInfo {
  fullName?: string;
  imgUrl?: string;
  username?: string;
  identity?: UserRoleType;
}

interface IQueryAccountInfoArgs {
  accountAddress: string;
}

export const queryAccountInfo = createSmartAction<
  RequestAction<IApiAccountInfo, IAccountInfo>,
  [IQueryAccountInfoArgs, RequestActionMeta<IApiAccountInfo, IAccountInfo>?]
>('queryAccountInfo', (params, meta) => ({
  request: {
    url: '/queryaccountinfo',
    method: 'post',
    data: {
      accountaddress: params.accountAddress,
    },
  },
  meta: {
    asMutation: false,
    ...meta,
    driver: 'axios',
    getData: (data: IApiAccountInfo) => {
      if (data.code !== 1) {
        return {
          imgUrl: undefined,
          username: truncateWalletAddr(params.accountAddress),
          fullName: truncateWalletAddr(params.accountAddress),
        };
      } else {
        return {
          fullName: data.data?.fullname,
          imgUrl: data.data?.imgurl,
          username: data.data?.username,
          identity: data.data?.identity,
        };
      }
    },
  },
}));
