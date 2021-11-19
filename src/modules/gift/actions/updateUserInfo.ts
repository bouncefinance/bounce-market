import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IApiUpdateUserInfo } from '../api/updateUserInfo';

interface IUpdateUserInfoArgs {
  accountaddress: string;
  verifycode: string;
  useravatar: string;
  username: string;
}

export const updateUserInfo = createSmartAction<
  RequestAction<IApiUpdateUserInfo, any>,
  [IUpdateUserInfoArgs]
>('updateUserInfo', params => ({
  request: {
    url: `/update_airdrop_userinfo`,
    method: 'post',
    data: params,
  },
  meta: {
    driver: 'axios',
    getData: data => {
      if (data.code !== 200) {
        console.error('updateUserInfo:', 'Unexpected response');
      }

      return data;
    },
  },
}));
