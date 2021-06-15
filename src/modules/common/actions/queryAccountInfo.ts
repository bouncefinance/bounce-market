import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { truncateWalletAddr } from '../utils/truncateWalletAddr';

interface IApiAccountInfo {
  code: 1 | number;
  data: IAccountInfo;
}

export interface IAccountInfo {
  imgurl: string | undefined;
  username: string;
  fullname: string;
}

export const queryAccountInfo = createSmartAction<
  RequestAction<IApiAccountInfo, IAccountInfo>
>('queryAccountInfo', (accountAddress: string) => ({
  request: {
    url: '/api/v2/main/queryaccountinfo',
    method: 'post',
    data: {
      accountaddress: accountAddress,
    },
  },
  meta: {
    driver: 'axios',
    getData: (data: IApiAccountInfo) => {
      if (data.code !== 1) {
        return {
          imgurl: undefined,
          username: truncateWalletAddr(accountAddress),
          fullname: truncateWalletAddr(accountAddress),
        };
      } else {
        return data.data;
      }
    },
  },
}));
