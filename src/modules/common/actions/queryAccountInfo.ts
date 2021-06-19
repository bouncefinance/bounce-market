import { RequestAction, RequestActionMeta } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { truncateWalletAddr } from '../utils/truncateWalletAddr';

interface IApiAccountInfo {
  code: number;
  msg?: string;
  data?: {
    fullname: string;
    imgurl: string;
    username: string;
  };
}

export interface IAccountInfo {
  fullName?: string;
  imgUrl?: string;
  username?: string;
}

interface IQueryAccountInfoArgs {
  accountAddress: string;
}

export const queryAccountInfo = createSmartAction<
  RequestAction<IApiAccountInfo, IAccountInfo>,
  [IQueryAccountInfoArgs, RequestActionMeta<IApiAccountInfo, IAccountInfo>?]
>('queryAccountInfo', (params, meta) => ({
  request: {
    url: '/api/v2/main/queryaccountinfo',
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
        };
      }
    },
  },
}));
