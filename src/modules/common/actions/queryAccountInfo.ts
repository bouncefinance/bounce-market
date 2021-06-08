
import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { convertWallet } from '../utils/convertWallet';

interface IApiAccountInfo {
  code: 1 | number,
  data: IAccountInfo
}

export interface IAccountInfo {
  imgurl: string | undefined;
  username: string;
  fullname: string;
}

export const queryAccountInfo = createSmartAction<
  RequestAction<IApiAccountInfo, IAccountInfo>
>(
  'queryAccountInfo',
  (accountAddress: string) => ({
    request: {
      url: '/api/v2/main/queryaccountinfo',
      method: 'post',
      data: {
        accountaddress: accountAddress
      }
    },
    meta: {
      driver: 'axiosSmartchain',
      getData: (data: IApiAccountInfo) => {
        if (data.code !== 1) {
          return {
            imgurl: undefined,
            username: convertWallet(accountAddress),
            fullname: convertWallet(accountAddress),
          }
        } else {
          return data.data;
        }
      },
    },
  })
)